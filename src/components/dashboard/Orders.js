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
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

//Icons
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import DirectionsRunTwoToneIcon from "@mui/icons-material/DirectionsRunTwoTone";
import PauseTwoToneIcon from "@mui/icons-material/PauseTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

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
    id: "order",
    numeric: false,
    disablePadding: true,
    label: "Order",
  },
  {
    id: "order_by",
    numeric: false,
    disablePadding: true,
    label: "Order By",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "published",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "payment_method",
    numeric: false,
    disablePadding: false,
    label: "Payment Method",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Order Status",
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
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{ color: "#fff" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ color: "#fff" }}
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

  // Upadate the status to Active
  const updateStatusToActive = () => {
    window.status = "active";
    window.updateStatus();
  };

  // Update the status to On Hold
  const updateStatusToOnHold = () => {
    window.status = "hold";
    window.updateStatus();
  };

  // Update the status to Pending
  const updateStatusToPending = () => {
    window.status = "processing";
    window.updateStatus();
  };

  // Update the status to Cancelled
  const updateStatusToCancelled = () => {
    window.status = "cancelled";
    window.updateStatus();
  };

  // Update the status to Completed
  const updateStatusToCompleted = () => {
    window.status = "completed";
    window.updateStatus();
  };

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
        color: "#fff",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Orders List
        </Typography>
      )}

      {/* Active */}
      {numSelected === 1 ? (
        <Tooltip title="Mark as Active" onClick={updateStatusToActive}>
          <Chip
            label="Active"
            component="a"
            clickable
            size="small"
            sx={{ width: 150, marginRight: 2 }}
            color="primary"
          />
        </Tooltip>
      ) : (
        ""
      )}

      {/* On Hold */}
      {numSelected === 1 ? (
        <Tooltip title="Mark as Hold" onClick={updateStatusToOnHold}>
          <Chip
            label="On Hold"
            component="a"
            clickable
            size="small"
            sx={{ width: 150, marginRight: 2 }}
            color="warning"
          />
        </Tooltip>
      ) : (
        ""
      )}

      {/* On Processing */}
      {numSelected === 1 ? (
        <Tooltip title="Mark as Processing" onClick={updateStatusToPending}>
          <Chip
            label="Processing"
            component="a"
            clickable
            size="small"
            color="secondary"
            sx={{ width: 150, marginRight: 2 }}
          />
        </Tooltip>
      ) : (
        ""
      )}

      {/* On Completed */}
      {numSelected === 1 ? (
        <Tooltip title="Mark as Completed" onClick={updateStatusToCompleted}>
          <Chip
            label="Complated"
            component="a"
            clickable
            size="small"
            sx={{ width: 150, marginRight: 2 }}
            color="success"
          />
        </Tooltip>
      ) : (
        ""
      )}

      {/* On Cancelled */}
      {numSelected === 1 ? (
        <Tooltip title="Mark as Cancelled" onClick={updateStatusToCancelled}>
          <Chip
            label="Cancelled"
            clickable
            size="small"
            sx={{ width: 150, marginRight: 2 }}
            color="error"
          />
        </Tooltip>
      ) : (
        ""
      )}

      {numSelected === 1 ? (
        <Tooltip title="View">
          <IconButton onClick={window.onViewClick} sx={{ color: "#fff" }}>
            <RemoveRedEyeTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={window.deletePost} sx={{ color: "#fff" }}>
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

export default function Categories() {
  // const [post, setPost] = React.useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [rows, setOrders] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [orderById, setOrderById] = React.useState("");

  const [totalOrder, setTotalOrder] = React.useState(0);
  const [activeOrders, setActiveOrders] = React.useState(0);
  const [completedOrders, setCompletedOrders] = React.useState(0);
  const [cancelledOrders, setCancelledOrders] = React.useState(0);
  const [processingOrders, setProcessingOrders] = React.useState(0);
  const [holdOrders, setHoldOrders] = React.useState(0);

  //Axios get request for all orders
  function totalOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/count`)
      .then((response) => {
        setTotalOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios patch request for status
  function updateStatus(row) {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/orders/${selected}/status`, {
        status: window.status,
      })
      .then((response) => {
        setAlert(response.data.message);
        setStatus(response.data.status);
        setOpen(true);
        getAllOrders();
        setLoading(false);
        totalOrderCount();
        activeOrderCount();
        holdOrderCount();
        processingOrderCount();
        completedOrderCount();
        cancelledOrderCount();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios get request for Active orders
  function activeOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/active`)
      .then((response) => {
        setActiveOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios get request for On hold orders
  function holdOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/hold`)
      .then((response) => {
        setHoldOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios get request for processing  orders
  function processingOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/processing`)
      .then((response) => {
        setProcessingOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios get request for completed orders
  function completedOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/completed`)
      .then((response) => {
        setCompletedOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Axios get request for cancelled orders
  function cancelledOrderCount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/cancelled`)
      .then((response) => {
        setCancelledOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Get all Orders
  function getAllOrders() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders`)
      .then((response) => {
        setOrders(response.data);
      });
  }

  //Get by id
  function getOrderById() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/${selected}`)
      .then((response) => {
        setOrderById(response.data);
      });
  }

  //Axios delete maney request
  window.deleteManyOrders = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
        data: {
          ids: selected,
        },
      })

      .then((response) => {
        setAlert(response.data.message);
        setOpen(true);
        getAllOrders();
        totalOrderCount();
        activeOrderCount();
        holdOrderCount();
        processingOrderCount();
        completedOrderCount();
        cancelledOrderCount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //On View Click
  window.onViewClick = () => {
    getOrderById();
    handleClickOpenDilog();
  };

  window.updateStatus = (id, status) => {
    updateStatus(id, status);
  };

  React.useEffect(() => {
    getAllOrders();
    setLoading(false);
    totalOrderCount();
    activeOrderCount();
    holdOrderCount();
    processingOrderCount();
    completedOrderCount();
    cancelledOrderCount();
  }, []);

  //Delete category
  window.deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/orders/${selected}`)
      .then((res) => {
        setAlert("Post successfully deleted", res);
        setStatus("success");
        getAllOrders();
        setSelected([]);
        totalOrderCount();
        activeOrderCount();
        holdOrderCount();
        processingOrderCount();
        completedOrderCount();
        cancelledOrderCount();
        setOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setOpen(true);
      });
  };

  // function createData(name, description, fat, carbs, published) {
  //   return { name, description, fat, carbs, published };
  // }
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

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

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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

  // Dilog box
  const [openDilog, setOpenDilog] = React.useState(false);

  const handleClickOpenDilog = () => {
    setOpenDilog(true);
  };

  const handleClickCloseDilog = () => {
    setOpenDilog(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {/* Alert */}
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
      {/* Dilog */}
      <div>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={openDilog}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClickCloseDilog}
          >
            #{orderById.orderId} - {orderById.order_by}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {/* Produv=cts Information */}
            <Typography variant="h6">Product Details</Typography>
            <CardMedia
              component="img"
              height="200"
              image={orderById.product_image}
              alt="green iguana"
              sx={{
                borderRadius: "2px",
                borderColor: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            />
            <Typography gutterBottom>
              <b>Product Name</b> - {orderById.product_name}
            </Typography>
            <Typography gutterBottom>
              <b>Price</b> - {orderById.product_price} {orderById.currency}
            </Typography>
            <Typography gutterBottom>
              <b>Product Quantity</b> - {orderById.product_quantity}
            </Typography>
            <Typography gutterBottom>
              <b>State</b> - {orderById.state}
            </Typography>
            <Typography gutterBottom>
              <b>Country</b> - {orderById.country}
            </Typography>
            {/* Shipping Address */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Shpping Address
            </Typography>
            <Typography gutterBottom>
              <b>Address Line 1</b> - {orderById.address_line_1}
            </Typography>
            <Typography gutterBottom>
              <b>Address Line 2</b> - {orderById.address_line_2}
            </Typography>
            <Typography gutterBottom>
              <b>Zip Code</b> - {orderById.zip_code}
            </Typography>
            <Typography gutterBottom>
              <b>City</b> - {orderById.city}
            </Typography>
            <Typography gutterBottom>
              <b>State</b> - {orderById.state}
            </Typography>
            <Typography gutterBottom>
              <b>Phone Number</b> - {orderById.phone_number}
            </Typography>
            <Typography gutterBottom>
              <b>Email</b> - {orderById.email}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Chip
              label={orderById.status}
              component="a"
              sx={{
                width: 100,
                textAlign: "center",
                alignSelf: "center",
                m: 2,
              }}
              color={
                orderById.status === "active"
                  ? "info"
                  : orderById.status === "cancelled"
                  ? "error"
                  : orderById.status === "hold"
                  ? "warning"
                  : orderById.status === "completed"
                  ? "success"
                  : "default"
              }
            />
            <Typography sx={{ flexGrow: 1 }} />
            <Button
              size="small"
              variant="contained"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <Grid container spacing={1}>
        {/* StartSubmit Form */}
        <Grid item xs={12}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            {/* Sels */}
            <Grid container spacing={1}>
              <Grid
                item
                xs={2.4}
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{ background: "#dbdbdb" }}
                  >
                    <BorderColorTwoToneIcon />
                  </IconButton>
                </Item>

                <Item
                  sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {activeOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Active Orders
                  </Typography>
                </Item>
              </Grid>

              {/* Total Users */}
              <Grid item xs={2.4} sx={{ display: "flex" }}>
                <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{ background: "#dbdbdb" }}
                  >
                    <PauseTwoToneIcon />
                  </IconButton>
                </Item>

                <Item
                  sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {holdOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    On Hold Orders
                  </Typography>
                </Item>
              </Grid>

              {/* Revenue */}
              <Grid item xs={2.4} sx={{ display: "flex" }}>
                <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{ background: "#dbdbdb" }}
                  >
                    <DirectionsRunTwoToneIcon />
                  </IconButton>
                </Item>

                <Item
                  sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {processingOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Processing Orders
                  </Typography>
                </Item>
              </Grid>

              {/* Products */}
              <Grid item xs={2.4} sx={{ display: "flex" }}>
                <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{ background: "#dbdbdb" }}
                  >
                    <DoneOutlineTwoToneIcon />
                  </IconButton>
                </Item>

                <Item
                  sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {completedOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Completed Orders
                  </Typography>
                </Item>
              </Grid>

              {/* Products */}
              <Grid item xs={2.4} sx={{ display: "flex" }}>
                <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{ background: "#dbdbdb" }}
                  >
                    <CancelTwoToneIcon />
                  </IconButton>
                </Item>

                <Item
                  sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    {cancelledOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                  >
                    Declined Orders
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        {/* End Submit form */}
        {/* Start Table of Post */}
        <Grid item xs={12} sx={{}}>
          <Paper sx={{ boxShadow: 0, borderRadius: 1, background: "#1A2027" }}>
            {loading ? (
              <Grid
                container
                spacing={2}
                sx={{
                  width: "100%",
                  height: "100%",
                  marginTop: 0,
                  paddingBottom: 4,
                  paddingTop: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              </Grid>
            ) : (
              <Item sx={{ boxShadow: 0, borderRadius: 1 }}>
                <Paper
                  sx={{
                    width: "100%",
                    mb: 2,
                    boxShadow: 0,
                    borderRadius: 1,
                    zIndex: 1,
                    background: "#1A2027",
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .slice()
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
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    sx={{ color: "#fff" }}
                                  />
                                </TableCell>

                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
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
                                    #{row.orderId}
                                  </Typography>
                                </TableCell>

                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "20ch",
                                      textOverflow: "ellipsis",
                                      color: "#fff",
                                    }}
                                  >
                                    {row.order_by}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "50ch",
                                      textOverflow: "ellipsis",
                                      color: "#fff",
                                    }}
                                  >
                                    {row.phone_number}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "50ch",
                                      textOverflow: "ellipsis",
                                      color: "#fff",
                                    }}
                                  >
                                    {row.email}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "20ch",
                                      textOverflow: "ellipsis",
                                      color: "#fff",
                                    }}
                                  >
                                    {row.date.slice(0, 10)}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography
                                    sx={{
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      maxWidth: "20ch",
                                      textOverflow: "ellipsis",
                                      color: "#fff",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {row.payment_method}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Chip
                                    label={row.status}
                                    component="a"
                                    clickable
                                    size="small"
                                    sx={{ width: 100 }}
                                    color={
                                      row.status === "active"
                                        ? "info"
                                        : row.status === "cancelled"
                                        ? "error"
                                        : row.status === "hold"
                                        ? "warning"
                                        : row.status === "completed"
                                        ? "success"
                                        : "secondary"
                                    }
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
                    sx={{ background: "#1A2027", color: "#fff" }}
                  />
                </Paper>
              </Item>
            )}
          </Paper>
          {/* End Table */}
        </Grid>
      </Grid>
    </Box>
  );
}
