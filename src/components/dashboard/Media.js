import ImageList from "@mui/material/ImageList";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Tooltip from '@mui/material/Tooltip';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1A2027",
}));

export default function Media() {
  const [files, setFiles] = React.useState(null);
  const [dir, setDir] = React.useState(null);
  const [server_alert, setAlert] = useState();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState();

  // Files Data
  function getFileData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/files/uploaded_files`).then((response) => {
      setFiles(response.data);
    });
  }

  //Delete Post
  function deleteOneFile(item) {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/files/delete`, {
        name: item.name,
      })
      .then((res) => {
        setAlert("File successfully Deleted", res);
        setStatus("success");
        getFileData();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setOpen(true);
  }

  // Directory Data
  React.useEffect(() => {
    getFileData();
  }, []);

  //get directory data path
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/files/dir`).then((response) => {
      setDir(response.data);
    });
  }, []);

  const onChange = (e) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/files`;
    let file = e.target.files[0];
    uploadFile(url, file);
    getFileData();
  };

  // Upload File
  const uploadFile = (url, file) => {
    let formData = new FormData();
    formData.append("uploadedFile", file);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((e) => {
        setAlert("File successfully uploaded", e);
        setStatus("success", e);
        getFileData();
        setOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
  };

  if (!files) return null;

  //Copy Link on Button Click
  const handleCopyClick = (item) => {
    setAlert("Link copied successfully");
    setStatus("success");
    navigator.clipboard.writeText(item.path);
    setOpen(true);
  };

  //On Click Open New Tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };

  //Alert
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
    <Grid container spacing={2} sx={{ marginBottom: 1, marginTop: 1 }}>
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

      <Grid item xs={12}>
        <Item sx={{ boxShadow: 0, display: "flex" }}>
          <label
            htmlFor="contained-button-file"
            sx={{
              maxWidth: 10,
              backgroundColor: "#333fff",
              justifyContent: "left",
              textAlign: "left",
            }}
          >
            <Button
              htmlFor="contained-button-file"
              variant="contained"
              component="span"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
                justifyContent: "left",
                textAlign: "left",
              }}
            >
              <input
                name="uploadedFile"
                multiple
                type="file"
                onChange={onChange}
                id="contained-button-file"
                accept="*"
              />
              Upload new file
            </Button>
          </label>
          <Typography sx={{ flexGrow: 1 }}></Typography>
        </Item>
      </Grid>

      <Grid item xs={12}>
        <Item sx={{ boxShadow: 0 }}>
          <ImageList
            sx={{ width: "100%", height: "80vh" }}
            cols={5}
            rowHeight={300}
          >
            {files
            .slice(0)
            .reverse()
            .map
            ((item) => (
              <Card
                sx={{ height: 250, margin: 1, backgroundColor: "#1A2027", boxShadow: 0, border: "1px solid #ccc" }}
                key={item.id}
              >
                {item.file_extension === ".jpg" ||
                item.file_extension === ".gif" ||
                item.file_extension === ".png" ||
                item.file_extension === ".jpeg" ||
                item.file_extension === ".svg" ||
                item.file_extension === ".ico" ? (
                  <CardMedia component="img" height="150" image={item.path} />
                ) : (
                  <Card
                    height="140"
                    sx={{
                      height: 150,
                      boxShadow: 0,
                      backgroundColor: "#1A2027",
                      display: "block",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <InsertDriveFileIcon
                      sx={{
                        width: 80,
                        height: 80,
                        color: "#fff",
                        marginTop: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.file_extension} file
                    </Typography>
                  </Card>
                )}

                <CardContent>
                  <Typography
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "25ch",
                      minWidth: "25ch",
                      textOverflow: "ellipsis",
                      justifyContent: "left",
                      textAlign: "left",
                      color: "#fff",
                    }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{ margin: 0, padding: 0, marginLeft: 1, marginRight: 1 }}
                >
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "#00000021", color: "#fff", border: "1px solid #fff" }}
                      onClick={onClickUrl(`${item.path}`)}
                    >
                      <RemoveRedEyeOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy Link">
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "#00000021", color: "#fff", border: "1px solid #fff" }}
                      onClick={() => handleCopyClick(item)}
                    >
                      <LinkOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      sx={{ backgroundColor: "#00000021", color: "#fff", border: "1px solid #fff" }}
                      onClick={() => deleteOneFile(item)}
                    >
                      <DeleteTwoToneIcon />
                    </IconButton>
                  </Tooltip>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                    sx={{ marginLeft: 5, color: "#fff" }}
                  >
                    {item.size} Bytes
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </ImageList>
        </Item>
      </Grid>
    </Grid>
  );
}
