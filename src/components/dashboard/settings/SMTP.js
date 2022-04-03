import * as React from "react";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#ffffff",
}));

export default function SMTP() {
  const SettingsURL = "http://localhost:4000/settings";
  const mailURL = "http://localhost:4000/mail";

  const [hostName, setHostName] = React.useState("");
  const [port, setPort] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secure, setSecure] = React.useState([]);
  const [fromEmail, setFromEmail] = React.useState("");
  const [id, setId] = React.useState("");

  const [toEmail, setToEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [openAlert, setAlertOpen] = React.useState(false);

  //Axios Get
  function getSettingsData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/settings`).then((response) => {
      setHostName(response.data[0].smtp[0].host);
      setPort(response.data[0].smtp[0].port);
      setUsername(response.data[0].smtp[0].user);
      setPassword(response.data[0].smtp[0].pass);
      setFromEmail(response.data[0].smtp[0].from);
      setSecure(response.data[0].smtp[0].secure);
      setId(response.data[0]._id);
      // console.log(response.data[0]._id);
    });
  }

  React.useEffect(() => {
    getSettingsData();
  }, []);

  //Axios update SMTP
  function updateSMTP() {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/settings/smtp/${id}`, {
        smtp: {
          host: hostName,
          port: port,
          user: username,
          pass: password,
          from: fromEmail,
          secure: secure,
        },
      })
      .then((response) => {
        console.log(response);
        setAlert(response.data.message);
        setStatus(response.data.status);
        setAlertOpen(true);
      })
      .catch((error) => {
        setAlert(error.response.data.message);
        setStatus(error.response.data.status);
        setAlertOpen(true);
      });
  }

  //Update SMTP
  function handleSubmit(event) {
    event.preventDefault();
    updateSMTP();
  }

  const [loading, setLoading] = React.useState(false);

  //Axios send mail
  function sendMail() {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/mail`, {
        to: toEmail,
        subject: subject,
        text: message,
        html: message,
      })
      .then((response) => {
        console.log(response);
        setAlert(response.data.message);
        setAlertOpen(true);
        setLoading(false);
      })
      .catch((error) => {
        setAlert(error.response.data.message);
        setAlertOpen(true);
        setLoading(false);
      });
  }

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
    <Box sx={{ width: "100%", boxShadow: 0, color: "#fff" }}>
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

      <Grid container spacing={1}>
        <Grid item xs>
          <Item>
            <Typography variant="h6">SMTP Settings</Typography>
            {/* Hostname */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Hostname *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Hostname"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              sx={{
                color: "#fff",
                background: "#333333",
                borderRadius: 1,
              }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Port */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Port *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Username */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Username *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Password */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Password *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Email */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Send from Email *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              sx={{
                background: "#333333",
                color: "#fff",
                borderRadius: 1,
                transition: "all 0.8s ease-in-out",
              }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Secure */}
            <br></br>
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Set Secure * (True/False)
            </InputLabel>

            <Checkbox
              checked={secure}
              onChange={(e) => setSecure(e.target.checked)}
              sx={{ color: "#fff" }}
            />
            <br></br>
            <Button
              size="small"
              onClick={handleSubmit}
              sx={{ marginTop: 3, color: "#fff" }}
              color="info"
              variant="contained"
            >
              Submit
            </Button>
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Typography variant="h6">Send Email</Typography>
            {/* To Email */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid To Email *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="To Email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Subject */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Subject *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            {/* Message */}
            <InputLabel
              htmlFor="bootstrap-input"
              shrink
              sx={{ marginTop: 3, color: "#fff" }}
            >
              Enter Valid Message *
            </InputLabel>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ background: "#333333", color: "#fff", borderRadius: 1 }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <br></br>
            <LoadingButton
              size="small"
              onClick={sendMail}
              sx={{ marginTop: 3, color: "#fff", background: "#333333" }}
              color="info"
              variant="contained"
              inputProps={{
                style: { color: "white" },
              }}
            >
              {loading ? "Sending..." : "Send"}
            </LoadingButton>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
