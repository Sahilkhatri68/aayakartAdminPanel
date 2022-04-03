import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import Chip from "@mui/material/Chip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));

export default function Pages() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click");
  };

  //get pages
  const [pages, setPages] = React.useState([]);
  const getPageData = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/pages`)
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getPageData();
  }, []);

  //Delete Page by ID
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/pages/${id}`)
      .then((res) => {
        console.log(res);
        setPages(pages.filter((page) => page._id !== id));
        getPageData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update Published Status
  const [published, setPublished] = React.useState(false);
  const handlePublish = (_id, published) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/pages/published/${_id}`, {
        published: !published,
      })
      .then((response) => {
        getPageData();
        console.log(!published);
        setPublished(response.data);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/pages/create")}
          >
            {/* <CloseIcon /> */}
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Static Pages
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} alignItems="stretch">
          <Item
            onDoubleClick={handleClick}
            sx={{
              height: "86vh",
              overflowY: "scroll",
            }}
          >
            {/* Loop */}
            <Grid container spacing={1}>
              {pages.map((page) => (
                <Grid item xs={3} key={page._id}>
                  <Item
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      textAlign: "start",
                      cursor: "pointer",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {page._id}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineClamp: 1,
                        }}
                      >
                        {page.title}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineClamp: 1,
                        }}
                      >
                        {/* {page.published ? "Published" : "Draft"} */}
                        {page.description}
                      </Typography>
                      <Typography variant="body2">
                        {page.createdAt.split("T")[0]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(page._id)}
                        sx={{
                          color: "#fff",
                        }}
                      >
                        <DeleteTwoToneIcon />
                      </IconButton>
                      {/* <IconButton
                        size="small"
                        sx={{
                          color: "#fff",
                        }}
                      >
                        <ModeEditTwoToneIcon />
                      </IconButton> */}
                      <Chip
                        onClick={() => handlePublish(page._id || page.published)}
                        sx={{ ml: 2, cursor: "pointer" }}
                        label={page.published ? "Published" : "Draft"}
                        variant="outlined"
                        color={page.published ? "success" : "error"}
                        size="small"
                      />
                    </CardActions>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
