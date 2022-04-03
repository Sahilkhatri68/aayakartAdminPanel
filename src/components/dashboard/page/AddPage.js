import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function Create() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click");
  };

  //get pages
  const [pages, setPages] = React.useState([]);
  const [content, setContent] = React.useState(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
  <h1>Hello World</h1>
  </body>
  </html>`);

  const [title, setTitle] = React.useState("Enter Page Title Here...");
  const [description, setDescription] = React.useState(
    "Enter Page Description Here..."
  );

  //Axios POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/pages`, {
      title: title,
      slug: slug,
      description: description,
      content: content,
    });
  };

  //Generate Slug
  const slug = slugify(title, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
    remove: /[*+~.()'"!:@#/]/g,
  });

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/pages")}
          >
            <CloseIcon />
          </IconButton>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "60%",
              height: "35px",
              color: "#fff",
              backgroundColor: "#00000000",
              outline: "none",
              border: "none",
              fontSize: "1.2rem",
              placeholder: "Enter Page Title",
              placeholderColor: "#fff",
            }}
          />

          <Divider sx={{ flexGrow: 1 }} />
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{
              boxShadow: 0,
            }}
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} alignItems="stretch">
          <Item
            onDoubleClick={handleClick}
            sx={{
              height: "86vh",
            }}
          >
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                height: "35px",
                color: "#fff",
                backgroundColor: "#000",
                outline: "none",
                border: "none",
                fontSize: "1rem",
                placeholder: "Describe your page",
                placeholderColor: "#fff",
                paddingLeft: "10px",
              }}
            />
            <Split
              style={{
                display: "flex",
                marginTop: "10px",
                width: "100% !important",
                height: "78vh",
              }}
            >
              <div
                style={{
                  backgroundColor: "#000",
                  width: "30%",
                }}
              >
                <CodeMirror
                  height="78vh"
                  style={{
                    backgroundColor: "#000",
                    textAlign: "start",
                  }}
                  extensions={[html({ htmlMode: true })]}
                  value={content}
                  onChange={(value) => setContent(value)}
                />
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "70% !important",
                  margin: "0px !important",
                  padding: "0px !important",
                }}
              >
                {/* Render HTML */}
                <iframe
                  width="100%"
                  height="100%"
                  srcDoc={content}
                  style={{
                    margin: "0px !important",
                    padding: "0px !important",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
            </Split>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
