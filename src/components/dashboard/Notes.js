import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#ffffff",
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
    label: "Title",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "protein",
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
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{ color: "#fff", ":hover": { color: "#fff" } }}
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
          sx={{ flex: "1 1 100%", color: "#fff" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", alignItems: "left", color: "#fff" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List Items
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={window.deleteNote} sx={{ color: "#fff" }}>
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

export default function Todo() {
  // const [post, setPost] = React.useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [server_alert, setAlert] = useState();
  const [rows, setNews] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState();

  //Get note
  function getNoteData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/note`).then((response) => {
      setNews(response.data);
    });
  }

  //Add note
  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/note`, {
        name,
        description,
      })
      .then((res) => {
        setAlert("Note successfully added", res);
        setStatus("success");
        getNoteData();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
      });
    setOpen(true);
  };

  //Delete note
  window.deleteNote = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/note/${selected}`)
      .then((res) => {
        setAlert("Note successfully deleted", res);
        setStatus("success");
        getNoteData();
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
    getNoteData();
  }, []);

  // function createData(name, description, fat, carbs, protein) {
  //   return { name, description, fat, carbs, protein };
  // }

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

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

  const theme = useTheme();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box
      sx={{ flexGrow: 1, marginTop: 3 }}
      timeout={transitionDuration}
      style={{
        transitionDelay: "1s",
        transition: "all 1s ease",
      }}
    >
      <Grid container spacing={1}>
        {/* StartSubmit Form */}
        <Grid item xs={3}>
          <Item sx={{ boxShadow: 0, borderRadius: 1 }}>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {/* <Typography>{server_alert}</Typography> */}
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

            <form>
              <Typography variant="caption2" gutterBottom>
                Add Note your secure note here
              </Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
                value={name}
                variant="filled"
                placeholder="Title"
                onChange={(e) => setName(e.target.value)}
                sx={{
                  width: "100%",
                  marginTop: 1,
                  background: "#333333",
                  borderRadius: 1,
                }}
                inputProps={{
                  style: { color: "white" },
                }}
              />

              <TextField
                hiddenLabel
                multiline
                placeholder="Description"
                value={description}
                variant="filled"
                size="small"
                onChange={(e) => setDescription(e.target.value)}
                rows={10}
                sx={{
                  width: "100%",
                  marginTop: 1,
                  background: "#333333",
                  borderRadius: 1,
                }}
                inputProps={{
                  style: { color: "white" },
                }}
              />

              <Grid item xs={12}>
                <Item
                  sx={{
                    boxShadow: 0,
                    background: "#1A2027",
                    borderRadius: 0,
                    marginTop: 5,
                    marginLeft: 0,
                  }}
                >
                  <Button
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      borderRadius: 0,
                      background: "#333333",
                    }}
                    size="small"
                    variant="contained"
                    onClick={createPost}
                  >
                    Add To Note
                  </Button>
                </Item>
              </Grid>
            </form>
          </Item>
        </Grid>
        {/* End Submit form */}
        {/* Start Table of Post */}
        <Grid item xs={9}>
          <Item sx={{ boxShadow: 0, borderRadius: 1 }}>
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                boxShadow: 0,
                borderRadius: 1,
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
                            timeout={transitionDuration}
                            style={{
                              transitionDelay: "1s",
                              transition: "all 1s ease",
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                sx={{ color: "#ffffff", ":hover": { color: "#ffffff" } }}
                              />
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
                                  color: "#ffffff",
                                }}
                              >
                                {row.name}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography
                                sx={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  maxWidth: "50ch",
                                  textOverflow: "ellipsis",
                                  color: "#ffffff",
                                }}
                              >
                                {row.description}
                              </Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography
                                sx={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  maxWidth: "30ch",
                                  textOverflow: "ellipsis",
                                  color: "#ffffff",
                                }}
                              >
                                {row.publishedAt.slice(0, 10)}
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
                sx={{ color: "#ffffff" }}
              />
            </Paper>
          </Item>
          {/* End Table */}
        </Grid>
      </Grid>
    </Box>
  );
}
