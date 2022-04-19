import Box from "@mui/material/Box";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ListItem from "@mui/material/ListItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  background: "#1A2027",
}));

export default function CORS() {
  const SettingsURL = "http://localhost:4000/settings";
  const corsAPI = "http://localhost:4000/cors";

  const [cors, setCors] = React.useState([]);
  const [corsUrl, setCorsUrl] = React.useState("");

  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [openAlert, setAlertOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  //Axios Get
  function getCorsData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/cors`).then((res) => {
      setCors(res.data);
    });
  }

  console.log(cors); 

  //Axios get
  function getSettingsData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/cors`).then((res) => {
      setId(res.data[0]._id);
      console.log(res.data[0]._id);
    });
  }

  React.useEffect(() => {
    getCorsData();
    getSettingsData();
  }, []);

  //Axios Delete CORS
  function deleteCors(cors) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cors/${id}/${cors._id}`)
      .then((res) => {
        getCorsData();
        setAlert("CORS URL deleted");
        setStatus("success");
        setAlertOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(cors._id);
  }

  //Axios post request to add new cors
  //Post Coupon
  const addCors = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/cors/${id}`, {
        url: corsUrl,
      })
      .then((res) => {
        setAlert("Coupon successfully added", res);
        setStatus("success");
        setAlertOpen(true);
        getCorsData();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 3,
        boxShadow: 0,
      }}
    >
      {/* Alert */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          resumeHideDuration={3000}
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
            {server_alert}
          </Alert>
        </Snackbar>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs>
          <Item sx={{ display: "block", boxShadow: 0, maxWidth: 400 }}>
            <TextField
              hiddenLabel
              placeholder="CORS URL"
              variant="filled"
              size="small"
              width="100%"
              sx={{ width: "100%", background: "#333333", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
              onChange={(e) => setCorsUrl(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#333",
                width: "100%",
                marginTop: 3,
                boxShadow: 0,
              }}
              onClick={addCors}
            >
              Add Site
            </Button>
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Box
              sx={{
                overflow: "scroll",
                height: "50vh",
              }}
            >
              {cors.map((cors) => (
                <Stack
                  spacing={2}
                  direction="row"
                  key={cors._id}
                  sx={{ cursor: "pointer", marginRight: 5 }}
                >
                  <ListItem
                    sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
                  >
                    <ListItemText
                      primary={cors.url}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />

                    <ListItemText
                      primary={cors.access_key}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>

                  <DeleteTwoToneIcon onClick={() => deleteCors(cors)} />
                </Stack>
              ))}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
