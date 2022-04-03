import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppTwoTone";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";


//Html Tooltip
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#fff",
  backgroundColor: "#1A2027",
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  {
    id: "2",
    numeric: false,
    disablePadding: true,
    label: "Products Name",
  },
  {
    id: "3",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "4",
    numeric: false,
    disablePadding: false,
    label: "Rating",
  },
  {
    id: "5",
    numeric: false,
    disablePadding: false,
    label: "Tags",
  },
  {
    id: "6",
    numeric: false,
    disablePadding: false,
    label: "Categories",
  },
  {
    id: "7",
    numeric: false,
    disablePadding: false,
    label: "Published At",
  },
  {
    id: "8",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{color: "white"}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{color: "white"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", display: { xs: "none", md: "flex" } }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", mr: 2, display: { xs: "none", md: "flex" } }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products Details
        </Typography>
      )}

      {/* View Product */}
      {numSelected === 1 ? (
        <Tooltip title="View">
          <IconButton sx={{ color: "#fff" }}>
            <RemoveRedEyeTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Edit Product */}
      {numSelected === 1 ? (
        <Tooltip title="Edit" sx={{ color: "#fff" }}>
          <IconButton
            to={`./../products/${window.selected}`}
            component={RouterLink}
          >
            <EditTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Delete Product */}
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{ color: "#fff" }}>
          <IconButton onClick={window.deleteProduct}>
            <DeleteTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Ralph Hubbarda",
  "Omar Alexandera",
  "Carlos Abbotta",
  "Miriam Wagnera",
  "Bradley Wilkersona",
  "Virginia Andrewsa",
  "Kelly Snydera",
];

function getStyles(name, tags, theme) {
  return {
    fontWeight:
      tags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// End Tags

export default function Products() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  window.selected = selected;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Get Category
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/category`).then((response) => {
      setCategory(response.data);
      // setLoading(false);
    });
  }, []);
  const theme = useTheme();

  //Product Title
  const [productTitle, setProductTitle] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productGallery, setProductGallery] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");
  const [featuredImageFront, setFeaturedImageFront] = React.useState("");
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

  const [rows, setProducts] = React.useState(null);

  // Set Featured Image
  const featuredImageHandleChange = (e) => {
    if (e.target.files) {
      // const FeaturedImage_ = Array.from(e.target.files).map((file) =>
      //   URL.createObjectURL(file)
      // );
      setFeaturedImage(e.target.files[0].name);
    }
    if (e.target.files) {
      const FeaturedImage_ = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFeaturedImageFront(FeaturedImage_);
    }
  };

  console.log(featuredImage);

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
        getProducts();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setAlertOpen(true);
  }

  //Get Product
  const getProducts = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`).then((response) => {
      setProducts(response.data);
    });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  if (!rows) return null;

  //Delete Product
  window.deleteProduct = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/products/${selected}`)
      .then((response) => {
        setAlert("Product successfully deleted", response);
        setStatus("success");
        console.log(response.data);
        getProducts();
        setAlertOpen(true);
        setSelected([]);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  //Edit Product
  const editProduct = (id) => {
    axios.get(`http://localhost:4000/products/${id}`).then((response) => {
      setProductTitle(response.data.title);
      setProductDescription(response.data.description);
      setProductCategory(response.data.category);
      setProductGallery(response.data.gallery);
      setFeaturedImage(response.data.featured_image);
      setFeaturedImageFront(response.data.featured_image_front);
      setRegularPrice(response.data.regular_price);
      setSalePrice(response.data.sale_price);
      setReviews(response.data.reviews);
      setComments(response.data.comments);
      setPrivate(response.data.isprivate);
      setStackStatus(response.data.stack_status);
      setTaxStatus(response.data.tax_status);
      setTaxClass(response.data.tax_class);
      setTags(response.data.tags);
    });
  };

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

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 3,
        boxShadow: 0,
        animation: "fadeIn 0.5s ease-in-out",
        transition: "box-shadow 1s ease-in-out",
      }}
    >
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

      <Grid container spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Item sx={{ boxShadow: 0, display: "flex" }}>
            <Button
              to="./../add-product"
              component={RouterLink}
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
              }}
            >
              Add New Product
            </Button>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            {/*  */}
            <Tooltip title="Export Products Data">
              <IconButton
                size="small"
                sx={{ background: "#dbdbdb", width: 30, height: 30 }}
              >
                <GetAppTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Item>
        </Grid>
      </Grid>

      {/*  */}

      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: 0,
          background: "#1A2027",
          color: "#fff",
        }}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .reverse()
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ color: "#fff" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          sx={{ color: "#fff" }}
                        />
                      </TableCell>

                      <TableCell
                        scope="row"
                        padding="none"
                        sx={{ color: "#fff" }}
                      >
                        <HtmlTooltip
                          placement="right"
                          title={
                            <React.Fragment>
                              <CardMedia
                                component="img"
                                height="140"
                                image={row.featured_image}
                                alt="green iguana"
                              />
                            </React.Fragment>
                          }
                        >
                          <Typography
                            size="small"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "20ch",
                              textOverflow: "ellipsis",
                              cursor: "pointer",
                              color: "#fff",
                            }}
                          >
                            {row.featured_image}
                          </Typography>
                        </HtmlTooltip>
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: "20ch",
                          minWidth: "15ch",
                          textOverflow: "ellipsis",
                          color: "#fff",
                        }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        {row.sale_price + " INR"}
                      </TableCell>
                      <TableCell align="left">
                        <Rating
                          name="half-rating-read"
                          value={row.all_reviews.rating}
                          precision={0.5}
                          readOnly
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ width: 400 }}>
                        {row.tags.map((value) => (
                          <Chip
                            sx={{ height: 18, fontSize: 12, margin: 0.2 }}
                            color="success"
                            size="small"
                            key={value._id}
                            label={value}
                          />
                        ))}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        {row.category}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        {row.publishedAt.slice(0, 10)}
                      </TableCell>

                      <TableCell align="left">
                        <Chip
                          label={row.status}
                          size="small"
                          color={
                            row.status == "active" ? "success" : "warning"
                          }
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 30, 40]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#fff" }}
        />
      </Paper>
    </Box>
  );
}
