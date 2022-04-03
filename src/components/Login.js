import { useState } from "react";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
  };

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState();
  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setAlert(res.data.message, res);
        setStatus(res.data.status);
        setOpen(true);
        //Redirect to home page if login is successful
        navigate("/");
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setOpen(true);
      });
  };

  // React.useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/login/check_have_token}`)
  //     .then((response) => {
  //       setLogged(response.data);
  //     });
  // }, []);

  //If logged in, redirect to home page
  if (logged) {
    navigate("/");
  }

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
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
      sx={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1A2027",
        padding: 5,
      }}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        {/* <Typography>{server_alert}</Typography> */}
        <Snackbar
          open={open}
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" sx={{ color: "#fff", marginBottom: 5 }}>
        Sign in
      </Typography>
      <Box
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: "50ch",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            type="text"
            required
            name="username"
            fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            size="small"
            sx={{ background: "#333" }}
            inputProps={{
              style: {
                color: "white",
              },
            }}
          />

          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            type="password"
            required
            name="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            sx={{ background: "#333" }}
            inputProps={{
              style: {
                color: "white",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "#333333",
              boxShadow: 0,
              color: "white",
              width: "50%",
            }}
            onClick={createPost}
            size="small"
          >
            Sign In
          </Button>

          <Grid container spacing={4}>
            <Grid item sx={{ marginTop: 5 }}>
            </Grid>
            <Grid item sx={{ marginTop: 5 }}>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
