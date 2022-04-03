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
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
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
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "@username",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Email address",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Users Role",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Date",
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
          sx={{
            flex: "1 1 100%",
            display: { xs: "none", md: "flex" },
            color: "#fff",
          }}
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
          Users List
        </Typography>
      )}

      {numSelected === 1 ? (
        <Tooltip title="Update">
          <IconButton sx={{ color: "#fff" }}>
            <ModeEditTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{ color: "#fff" }}>
          <IconButton>
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

export default function Users() {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [loading, setLoading] = React.useState(false);
  // function handleLoadingClick() {
  //   setLoading(true);
  // }

  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [fname, setFName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [openalert, setOpenAlert] = useState(false);
  const [rows, setUsers] = React.useState([]);

  function getUsers() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`).then((response) => {
      setUsers(response.data);
    });
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        fname,
        username,
        email,
        password,
        phone,
      })
      .then((res) => {
        setAlert("User successfully added", res);
        setStatus("success");
        getUsers();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setOpenAlert(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // Alert
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleAlertClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: "100%", marginTop: 3, boxShadow: 0 }}>
      <Grid container spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Item sx={{ boxShadow: 0 }}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
              }}
            >
              Add New User
            </Button>
          </Item>
        </Grid>
      </Grid>

      {/* Show Alert */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={openalert}
          autoHideDuration={5000}
          resumeHideDuration={5000}
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={status}
            sx={{ width: "100%" }}
          >
            {server_alert}
          </Alert>
        </Snackbar>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <TextField
              hiddenLabel
              value={fname}
              variant="filled"
              size="small"
              onChange={(e) => setFName(e.target.value)}
              margin="dense"
              sx={{ width: "100%" }}
              placeholder="Full Name"
            />
            <TextField
              hiddenLabel
              value={username}
              variant="filled"
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              margin="dense"
              sx={{ width: "100%" }}
              placeholder="Username"
            />
            <TextField
              hiddenLabel
              value={email}
              variant="filled"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              margin="dense"
              sx={{ width: "100%" }}
              placeholder="Email"
            />
            <TextField
              hiddenLabel
              value={password}
              variant="filled"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              margin="dense"
              sx={{ width: "100%" }}
              placeholder="Password"
            />
            <TextField
              hiddenLabel
              value={phone}
              variant="filled"
              size="small"
              onChange={(e) => setPhone(e.target.value)}
              margin="dense"
              sx={{ width: "100%" }}
              placeholder="Phone Number"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ boxShadow: 0 }}
              onClick={createPost}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Paper sx={{ width: "100%", mb: 2, boxShadow: 0, background: "#1A2027" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
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
                          maxWidth: "30ch",
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
                          {row.fname}
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
                          {row.username}
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
                          {row.email}
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
                          {row.role}
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
                          {row.phone}
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
