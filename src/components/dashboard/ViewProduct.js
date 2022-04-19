import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import CardMedia from "@mui/material/CardMedia";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Link as RouterLink, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#ffffff",
  backgroundColor: "#1A2027",
  borderRadius: "0px",
}));

export default function Categories() {
  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [product, setProduct] = React.useState([]);

  const { id } = useParams();

  //Get all categories
  function getProductsData() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      });
  }
  React.useEffect(() => {
    getProductsData();
  }, []);

  const gly = product.gallery;
  console.log(gly);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, background: "#1A2027" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Item
            sx={{
              boxShadow: 0,
              display: "flex",
              background: "#333333",
            }}
          >
            {/* Back BTN */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<RemoveRedEyeTwoToneIcon />}
              component={RouterLink}
              to="/products"
              size="small"
            >
              Back
            </Button>
            {/* SKU */}
            <Typography
              sx={{
                flexGrow: 1,
              }}
            />
            <Typography variant="h6" component="h6">
              SKU: {product.sku}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item>
            <Typography variant="h5" component="h3">
              {product.title}
            </Typography>
            <Typography variant="h6" component="h3">
              {product.slug}
            </Typography>
            <br></br>
            <Typography variant="body2" component="h3">
              {product.description}
            </Typography>
            <br></br>
            {/* Category */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Category: {product.category}
            </Typography>
            {/* Sale Price */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Sale Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
              }).format(product.sale_price)}
            </Typography>
            {/* Regular Price */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Regular Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
              }).format(product.regular_price)}
            </Typography>
            {/* Item Sold */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Item Sold: {product.sold_item}
            </Typography>
            {/* Tags */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Tags: {product.tags + ","}
            </Typography>
            {/* Status */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Status: {product.status}
            </Typography>
            {/* Stack Status */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Stack Status: {product.stock_status}
            </Typography>
            {/* Published Date */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Published Date: {product.publishedAt}
            </Typography>
            {/* Published By */}
            <Typography
              variant="body1"
              component="h3"
              sx={{ background: "#00000023", width: "auto", marginBottom: 1 }}
            >
              Published By: {product.publisher}
            </Typography>

          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            {/* Image */}
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={product.featured_image}
              title="Contemplative Reptile"
            />

            {/* Gallery */}
            <ImageList>
                {gly.map((item) => (
                    <ImageListItem
                    key={item.id}
                    src={item.src}
                    />
                ))}
            </ImageList>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
