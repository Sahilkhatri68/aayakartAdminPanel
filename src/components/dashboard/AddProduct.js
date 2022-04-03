import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import Snackbar from "@mui/material/Snackbar";
import slugify from "slugify";
import Autocomplete from '@mui/material/Autocomplete';

import { Link as RouterLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#fff",
  boxShadow: theme.shadows[0],
  borderRadius: 2,
}));

// Tags
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "fun",
  "sports",
  "travel",
  "tranding",
  "youtube",
  "insta",
  "super",
  "amazing",
  "trands",
  "hashtag",
  "movie",
  "post",
  "music",
  "food",
  "fashion",
  "travel",
  "testy",
];

function getStyles(name, tags, theme) {
  return {
    fontWeight:
      tags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NewProduct() {
  //Product Title
  const [productTitle, setProductTitle] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productGallery, setProductGallery] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");
  const [regularPrice, setRegularPrice] = React.useState("");
  const [salePrice, setSalePrice] = React.useState("");
  const [reviews, setReviews] = React.useState(false);
  const [comments, setComments] = React.useState(false);
  const [isprivate, setPrivate] = React.useState(false);
  const [stackStatus, setStackStatus] = React.useState("");
  const [taxStatus, setTaxStatus] = React.useState("");
  const [taxClass, setTaxClass] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [server_alert, setAlert] = React.useState();
  const [status, setStatus] = React.useState();
  const [alertOpen, setAlertOpen] = React.useState(false);

  //Generate Slug
  const slug = slugify(productTitle, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
    remove: /[*+~.()'"!:@#/]/g,
  });

  // Set Featured Image
  const productGalleryHandleChange = (e) => {
    if (e.target.files) {
      const productGallery = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setProductGallery(productGallery);
      console.log(productGallery);
    }
  };

  const handleReviewsChange = () => {
    setReviews(!reviews);
  };

  const handleCommentsChange = () => {
    setComments(!comments);
  };

  const handlePrivateChange = () => {
    setPrivate(!isprivate);
  };

  //Create Product
  function createPost() {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        productTitle,
        slug,
        productDescription,
        productCategory,
        tags,
        productGallery,
        featuredImage,
        regularPrice,
        salePrice,
        reviews,
        comments,
        isprivate,
        stackStatus,
        taxStatus,
        taxClass,
      })
      .then((response) => {
        setAlert("Product successfully added", response);
        setStatus("success");
        console.log(response.data);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setAlertOpen(true);
    console.log(
      productTitle,
      slug,
      productDescription,
      productCategory,
      tags,
      productGallery,
      featuredImage,
      regularPrice,
      salePrice,
      reviews,
      comments,
      isprivate,
      stackStatus,
      taxStatus,
      taxClass
    );
  }

  // Get Category
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
      .then((response) => {
        setCategory(response.data);
        // setLoading(false);
      });
  }, []);
  const theme = useTheme();

  const alertHandleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const alertAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={alertHandleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  //Get Files
  const [getFiles, setGetFiles] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/files/uploaded_files`)
      .then((response) => {
        setGetFiles(response.data);
        // setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {/* Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        resumeHideDuration={5000}
        action={alertAction}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={alertHandleClose}
      >
        <Alert
          onClose={alertHandleClose}
          severity={status}
          sx={{ width: "100%" }}
        >
          {server_alert}
        </Alert>
      </Snackbar>

      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          {/*  */}
          <Item sx={{ boxShadow: 0, background: "#333" }}>
            <Stack
              spacing={1}
              direction="row"
              sx={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                size="small"
                to={`./../products`}
                component={RouterLink}
              >
                <ArrowBackTwoToneIcon sx={{ color: "#fff" }} />
              </IconButton>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ boxShadow: 0 }}
                onClick={createPost}
              >
                Publish
              </Button>
            </Stack>
          </Item>
          {/*  */}
          <Item>
            <form>
              <Grid container spacing={1} sx={{ padding: 1 }}>
                <Grid item xs={8}>
                  <Grid>
                    <Item sx={{ borderRadius: 1 }}>
                      <Typography variant="body2">
                        <strong>Slug:</strong> {slug}
                      </Typography>
                      {/* Title */}
                      <TextField
                        hiddenLabel
                        variant="filled"
                        size="small"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        margin="dense"
                        sx={{
                          width: "100%",
                          background: "#333333",
                          borderRadius: 1,
                        }}
                        inputProps={{
                          style: { color: "white" },
                        }}
                        placeholder="Title"
                      />

                      {/* Description */}
                      <TextField
                        hiddenLabel
                        variant="filled"
                        size="small"
                        onChange={(e) => setProductDescription(e.target.value)}
                        margin="dense"
                        value={productDescription}
                        sx={{
                          width: "100%",
                          background: "#333333",
                          borderRadius: 1,
                        }}
                        inputProps={{
                          style: { color: "white" },
                        }}
                        placeholder="Product Description"
                        multiline
                        minRows={5}
                        maxRows={8}
                      />

                      {/* Category */}
                      <Select
                        id="demo-multiple-name"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        hiddenLabel
                        MenuProps={MenuProps}
                        sx={{
                          background: "#333333",
                          borderRadius: 1,
                          width: "100%",
                          color: "white",
                          outline: "none",
                          marginTop: 1,
                          height: 40,
                          "::selection": {
                            background: "#333333",
                            color: "white",
                            outline: "none",
                          },
                          ":hover": {
                            background: "#333333",
                            color: "white",
                            outline: "none",
                          },
                        }}
                        inputProps={{
                          style: { color: "white", outline: "none" },
                        }}
                      >
                        {category.map((name) => (
                          <MenuItem key={name._id} value={name.name}>
                            {name.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {/* Tags */}

                      <Select
                        hiddenLabel
                        id="demo-multiple-chip"
                        multiple
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip
                                size="small"
                                variant="filled"
                                key={value}
                                label={value}
                                color="info"
                              />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                        size="small"
                        sx={{
                          marginTop: 2,
                          width: "100%",
                          background: "#333333",
                        }}
                        inputProps={{
                          style: { color: "white" },
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, tags, theme)}
                            size="small"
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>

                      {/* Upload */}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-files">
                          <Button
                            variant="contained"
                            component="span"
                            size="small"
                            sx={{
                              backgroundColor: "#333333",
                              marginTop: 2,
                              marginBottom: 2,
                              boxShadow: 0,
                            }}
                          >
                            <input
                              accept="image/*"
                              id="contained-button-files"
                              type="file"
                              multiple
                              onChange={productGalleryHandleChange}
                              sx={{ display: "none" }}
                            />
                            Gallery
                          </Button>
                        </label>
                      </Stack>

                      {/* Image List */}
                      <ImageList
                        sx={{ width: "100%", height: 200 }}
                        cols={5}
                        row={1}
                        rowHeight={200}
                      >
                        {itemData.map((item) => (
                          <ImageListItem key={item.id}>
                            <img
                              src={productGallery}
                              loading="lazy"
                              alt={productGallery}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Item>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ marginTop: 0 }}>
                    <Card sx={{ width: "100%", height: 220 }}>
                      <CardMedia
                        component="img"
                        height="100%"
                        width="100%"
                        src={featuredImage}
                        image={featuredImage}
                        alt=""
                        sx={{
                          cursor: "pointer",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundColor: "#333333",
                        }}
                      />
                    </Card>
                    {/* FeaturedImage */}
                    <Select
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      hiddenLabel
                      MenuProps={MenuProps}
                      sx={{
                        background: "#333333",
                        borderRadius: 1,
                        width: "100%",
                        color: "white",
                        outline: "none",
                        height: 40,
                        marginTop: 1,
                        ":hover": {
                          background: "#333333",
                          color: "white",
                          outline: "none",
                        },
                      }}
                      inputProps={{
                        style: { color: "white", outline: "none" },
                      }}
                    >
                      {getFiles.map((name) => (
                        <MenuItem key={name._id} value={name.path}>
                          {name.path}
                        </MenuItem>
                      ))}
                    </Select>

                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      placeholder="Regular Price"
                      variant="filled"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                      type="number"
                      size="small"
                      sx={{
                        marginTop: 2,
                        marginRight: 2,
                        background: "#333333",
                        borderRadius: 1,
                      }}
                      inputProps={{
                        style: { color: "white" },
                      }}
                    />

                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      placeholder="Sale Price"
                      variant="filled"
                      size="small"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      type="number"
                      sx={{
                        marginTop: 2,
                        marginRight: 2,
                        background: "#333333",
                        borderRadius: 1,
                      }}
                      inputProps={{
                        style: { color: "white" },
                      }}
                    />

                    <Card
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        boxShadow: 0,
                        justifyContent: "left",
                        marginTop: 2,
                        background: "#1A2027",
                        color: "white",
                      }}
                    >
                      <Checkbox
                        {...label}
                        checked={reviews}
                        onChange={handleReviewsChange}
                        sx={{ color: "white" }}
                      />
                      <Typography>Enable Reviews?</Typography>
                    </Card>
                    <Card
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        boxShadow: 0,
                        background: "#1A2027",
                        color: "white",
                      }}
                    >
                      <Checkbox
                        {...label}
                        checked={comments}
                        onChange={handleCommentsChange}
                        sx={{ color: "white" }}
                      />{" "}
                      <Typography>Enable Comments?</Typography>
                    </Card>
                    <Card
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        boxShadow: 0,
                        justifyContent: "left",
                        background: "#1A2027",
                        color: "white",
                      }}
                    >
                      <Checkbox
                        {...label}
                        checked={isprivate}
                        onChange={handlePrivateChange}
                        sx={{ color: "white" }}
                      />
                      <Typography>Is this private?</Typography>
                    </Card>

                    <Card sx={{ background: "#1A2027" }}>
                      {/* Stack Status */}
                      <TextField
                        id="uncontrolled-native"
                        select
                        hiddenLabel
                        value={stackStatus}
                        defaultValue="in_stack"
                        onChange={(e) => setStackStatus(e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                        sx={{
                          width: "100%",
                          marginTop: 2,
                          background: "#333333",
                          color: "white",
                          borderRadius: 1,
                        }}
                        inputProps={{
                          style: { color: "white" },
                        }}
                        variant="filled"
                        size="small"
                      >
                        <option value="in_stack">In stack</option>
                        <option>Out of stack</option>
                      </TextField>

                      {/* Tax Information */}
                      <TextField
                        id="uncontrolled-native"
                        select
                        hiddenLabel
                        SelectProps={{
                          native: true,
                        }}
                        sx={{
                          width: "100%",
                          marginTop: 2,
                          background: "#333333",
                          borderRadius: 1,
                        }}
                        inputProps={{
                          style: { color: "white" },
                        }}
                        variant="filled"
                        size="small"
                        value={taxStatus}
                        defaultValue="taxable"
                        onChange={(e) => setTaxStatus(e.target.value)}
                      >
                        <option>Nontaxable</option>
                        <option value="taxable">Taxble</option>
                      </TextField>

                      {taxStatus === "taxable" ? (
                        <TextField
                          id="uncontrolled-native"
                          select
                          hiddenLabel
                          value={taxClass}
                          onChange={(e) => setTaxClass(e.target.value)}
                          SelectProps={{
                            native: true,
                          }}
                          sx={{
                            width: "100%",
                            marginTop: 2,
                            color: "white",
                            background: "#333333",
                          }}
                          variant="filled"
                          size="small"
                          inputProps={{
                            style: { color: "white" },
                          }}
                        >
                          <option>Standerd</option>
                          <option>Medium</option>
                        </TextField>
                      ) : (
                        ""
                      )}
                    </Card>
                    <Typography sx={{ marginTop: 2 }}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.{" "}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </form>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

const itemData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
];
