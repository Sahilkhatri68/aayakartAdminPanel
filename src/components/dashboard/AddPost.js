import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Link as RouterLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#ffffff",
  backgroundColor: "#1A2027",
}));

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [rows, setBlogs] = React.useState([]);
  const [openAlert, setAlertOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  //Get all categories
  function getBlogsData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogs`).then((response) => {
      setBlogs(response.data);
    });
  }

  React.useEffect(() => {
    getBlogsData();
    getCategories();
    setLoading(false);
  }, []);

  //Post new category
  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blogs`, {
        title,
        description,
        content,
        category,
        image,
      })
      .then((res) => {
        setAlert("Post successfully added", res);
        setStatus("success");
        getBlogsData();
        setAlertOpen(true);
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

  const [category, setCategory] = React.useState("");

  //Axios request for category list
  const [categories, setCategories] = React.useState([]);
  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
      });
  };

  return (
    <Box sx={{ marginTop: 3 }}>
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
      {/* Alert */}
      <AppBar
        variant="dense"
        sx={{ position: "relative", backgroundColor: "#333333" }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            to={`./../`}
            component={RouterLink}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create Blog
          </Typography>
          <Button
            size="small"
            color="inherit"
            variant="contained"
            color="success"
            onClick={createPost}
          >
            Publish
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, background: "#1A2027" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              placeholder="Title"
              variant="filled"
              fullWidth
              size="small"
              value={title}
              sx={{ background: "#333", borderRadius: 1 }}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              placeholder="Description"
              variant="filled"
              fullWidth
              size="small"
              value={description}
              sx={{ background: "#333", borderRadius: 1 }}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              placeholder="Content"
              variant="filled"
              size="small"
              fullWidth
              multiline
              rows={15}
              value={content}
              sx={{ background: "#333", borderRadius: 1 }}
              onChange={(e) => setContent(e.target.value)}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              sx={{
                background: "#333",
                textAlign: "left",
              }}
            >
              <Select
                defaultValue={0}
                value={category}
                size="small"
                hiddenLabel
                onChange={(e) => setCategory(e.target.value)}
                inputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#333",
                    borderRadius: 1,
                    outline: "none",
                  },
                }}
                sx={{
                  backgroundColor: "#333",
                  borderRadius: 1,
                  color: "#fff",
                  outline: "none",
                  border: "none",
                }}
              >
                <MenuItem value={0}>Select Category</MenuItem>
                {categories !== null ? (
                  categories.map((category) => (
                    // <option key={category._id} value={category.name}>
                    //   {category.name}
                    // </option>
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* <Select
                    size="small"
                    id="demo-simple-select-filled"
                    value={categories}
                    onChange={e => setCategories(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              placeholder="Feacher Image link"
              variant="filled"
              fullWidth
              size="small"
              sx={{ background: "#333", borderRadius: 1 }}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              inputProps={{ style: { color: "#fff" } }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
