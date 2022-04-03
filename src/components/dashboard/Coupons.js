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
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Products Name",
  },
  {
    id: "discount",
    numeric: false,
    disablePadding: false,
    label: "Discount Price",
  },
  {
    id: "code",
    numeric: false,
    disablePadding: false,
    label: "Coupons Code",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Published At",
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
          sx={{ flex: "1 1 100%", display: { xs: "none", md: "flex" }, color: "#fff" }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: "1 1 100%",
            mr: 2,
            display: { xs: "none", md: "flex" },
            color: "#fff",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Comments
        </Typography>
      )}

      {/* Delete Comment */}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={window.deleteCoupon} sx={{ color: "#fff" }}>
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

export default function Coupons() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("discount");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
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

  //Dolog
  const [openDilog, setOpenDilog] = React.useState(false);

  const handleDilogClickOpen = () => {
    setOpenDilog(true);
  };

  const handleDilogClose = () => {
    setOpenDilog(false);
  };

  //Get Products
  const [productsList, setProductsList] = React.useState([]);
  const getProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
    setProductsList(response.data);
  };
  React.useEffect(() => {
    getProducts();
  }, []);


  //Axios post request for coupon
  const [status, setStatus] = React.useState();
  const [server_alert, setAlert] = React.useState();
  const [code, setCode] = React.useState();
  const [discount, setDiscount] = React.useState();
  const [minOrderAmount, setMinOrderAmount] = React.useState();
  const [productId, setProductId] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleCouponGenerate = () => {
    setCode(Math.random().toString(36).substring(2, 10));
  };

  //Post Coupon
  const createCoupon = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/coupon`, {
        code,
        discount,
        minOrderAmount,
        productId,
      })
      .then((res) => {
        setAlert("Coupon successfully added", res);
        setStatus("success");
        getCoupons();
        setOpen(true);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setOpen(true);
      });
  };

  //Get Coupons
  const [rows, setCouponsList] = React.useState([]);

  function getCoupons() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/coupon`).then((response) => {
      setCouponsList(response.data);
    });
  }

  //Delete Coupon
  window.deleteCoupon = () => {
    axios
      .delete(`http://localhost:4000/coupon/${selected}`)
      .then((res) => {
        setAlert("Coupon successfully deleted", res);
        setStatus("success");
        getCoupons();
        setOpen(true);
        setSelected([]);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setOpen(true);
      });
  };

  React.useEffect(() => {
    getCoupons();
  }, []);

  // Alert
  const handleClose = (event, reason) => {
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
    <Box sx={{ width: "100%", marginTop: 3, boxShadow: 0 }}>
      <Grid container spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Item sx={{ boxShadow: 0 }}>
            {/* Alert */}
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Snackbar
                open={open}
                autoHideDuration={8000}
                resumeHideDuration={3000}
                action={action}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={status}
                  sx={{ width: "100%" }}
                >
                  {server_alert}
                </Alert>
              </Snackbar>
            </Stack>

            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
              }}
              onClick={handleDilogClickOpen}
            >
              Create Coupon
            </Button>
          </Item>
        </Grid>
      </Grid>

      {/* On Button Click Open Dilog */}
      <Dialog open={openDilog} onClose={handleDilogClose}>
        <DialogTitle>Coupon</DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ marginTop: 2 }}>
            Select the product on which you want to give discount
          </Typography>
          {/* Select Product */}
          <FormControl
            size="small"
            variant="filled"
            fullWidth
            label="Email Address"
            focused
          >
            <InputLabel id="demo-simple-select-standard-label">
              Select Product
            </InputLabel>
            <Select
              id="demo-simple-select-filled"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {productsList.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Discount Price */}
          <Typography variant="caption" sx={{ marginTop: 2 }}>
            Set Discount Price
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            id="name"
            label="Discount Price"
            type="number"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            variant="filled"
            focused
          />

          {/* Coupan Code */}
          <Typography variant="caption" sx={{ marginTop: 2 }}>
            Click To Generate Coupon Code
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            id="name"
            label="Coupon Code"
            type="text"
            fullWidth
            value={code}
            onClick={handleCouponGenerate}
            onChange={(e) => setCode(e.target.value)}
            variant="filled"
            focused
          />

          {/* Coupan Code */}
          <Typography variant="caption" sx={{ marginTop: 2 }}>
            Set Minimum Order Amount
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            id="name"
            label="Minimum Order Amount"
            type="text"
            fullWidth
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            variant="filled"
            focused
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleDilogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              boxShadow: 0,
              background: "#333333",
            }}
            onClick={createCoupon}
          >
            Add Coupon
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ width: "100%", mb: 2, boxShadow: 0, background: "#1A2027" }}>
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
                          sx={{ color: "#fff" }}
                        />
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
                          textOverflow: "ellipsis",
                          color: "#fff",
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "30ch",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                          }}
                        >
                          {row.productId}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "10ch",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                          }}
                        >
                          {row.discount}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "30ch",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                          }}
                        >
                          {row.code}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#fff" }}>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: "30ch",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                          }}
                        >
                          {row.createdAt.slice(0, 10)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
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
