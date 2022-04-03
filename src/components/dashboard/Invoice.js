import { useState } from "react";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1A2027",
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Invoice() {
  //Axios get request to get all invoices
  const [invoices, setInvoices] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [customer, setCustomer] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [note, setNote] = React.useState("");
  const [server_alert, setAlert] = useState();
  const [status, setStatus] = useState();
  const [openAlert, setAlertOpen] = React.useState(false);

  //Axios Delete request to delete invoice
  const deleteInvoice = (invoice) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/invoice/${invoice._id}`)
      .then((res) => {
        setAlert("Invoice successfully Deleted", res);
        setStatus("success");
        setAlertOpen(true);
        getInvoices();
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setStatus(e.response.data.status);
        setAlertOpen(true);
      });
  };

  //Axios get request to get all invoices
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        setStatus(err.response.data.status);
        setAlertOpen(true);
      });
  }, []);

  //Axios get request to get all customers
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        setStatus(err.response.data.status);
        setAlertOpen(true);
      });
  }, []);

  //Axios get request to get all invoices
  function getInvoices() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/invoice`)
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        setStatus(err.response.data.status);
        setAlertOpen(true);
      });
  }

  React.useEffect(() => {
    getInvoices();
  }, []);

  //Axios post request to create an invoice
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/invoice`, {
        invoice_customer_username: customer,
        invoice_product_name: product,
        invoice_total: amount,
        invoice_discount: discount,
        invoice_notes: note,
      })
      .then((res) => {
        setNote(res.data.message);
        setAlert("Post successfully added", res);
        setStatus("success");
        setAlertOpen(true);
        getInvoices();
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        setStatus(err.response.data.status);
        setAlertOpen(true);
      });
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Alert */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={openAlert}
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

      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ marginTop: 3 }}>
          <Item sx={{ boxShadow: 0, borderRadius: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                boxShadow: 0,
                background: "#333333",
              }}
            ></Button>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              boxShadow: 0,
              justifyContent: "left",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            {/* Select Users*/}
            <FormControl
              variant="filled"
              sx={{
                minWidth: 120,
                width: "100%",
                marginTop: 2,
                background: "#333333",
                borderRadius: 1,
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-filled-label"
                sx={{ color: "#fff" }}
              >
                Select User
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                sx={{ color: "white" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer._id} value={customer._id}>
                    {customer.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Select Products*/}
            <FormControl
              variant="filled"
              sx={{
                minWidth: 120,
                width: "100%",
                marginTop: 2,
                background: "#333333",
                borderRadius: 1,
                color: "white",
              }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-filled-label"
                sx={{ color: "#fff" }}
              >
                Select Product
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                sx={{ color: "white" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem
                    key={product._id}
                    value={product.title}
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      minWidth: "30ch",
                      textOverflow: "ellipsis",
                      background: "#ffffffbe",
                    }}
                  >
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              hiddenLabel
              placeholder="Message"
              variant="filled"
              sx={{
                width: "100%",
                marginTop: 2,
                background: "#333333",
                borderRadius: 1,
              }}
              size="small"
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              multiline
              inputProps={{
                style: { color: "white" },
              }}
            />

            <TextField
              hiddenLabel
              placeholder="Amount"
              variant="filled"
              sx={{
                width: "100%",
                marginTop: 2,
                background: "#333333",
                borderRadius: 1,
              }}
              size="small"
              value={amount}
              type="number"
              onChange={(event) => setAmount(event.target.value)}
              inputProps={{
                style: { color: "white" },
              }}
            />

            <TextField
              hiddenLabel
              placeholder="Discount"
              variant="filled"
              sx={{
                width: "100%",
                marginTop: 2,
                background: "#333333",
                borderRadius: 1,
              }}
              inputProps={{
                style: { color: "white" },
              }}
              size="small"
              value={discount}
              type="number"
              onChange={(event) => setDiscount(event.target.value)}
            />

            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex", marginTop: 10 },
                boxShadow: 0,
                background: "#333333",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item
            sx={{
              boxShadow: 0,
              justifyContent: "left",
              alignItems: "left",
              textAlign: "left",
              overflow: "scroll",
              maxHeight: "88vh",
            }}
          >
            <div>
              {invoices
                .slice()
                .reverse()
                .map((invoice) => (
                  <Accordion
                    expanded={expanded === invoice._id}
                    onChange={handleChange(invoice._id)}
                    value="dense"
                    key={invoice._id}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      key={invoice._id}
                      sx={{
                        height: 40,
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        background: "#1A2027",
                        color: "white",
                      }}
                    >
                      <Typography
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: "55ch",
                          minWidth: "30ch",
                          textOverflow: "ellipsis",
                          background: "#1A2027",
                          color: "white",
                        }}
                      >
                        {invoice.invoice_product_name}
                      </Typography>
                      <Chip
                        label={invoice.invoice_total}
                        sx={{ marginLeft: 5 }}
                        size="small"
                        color="primary"
                      />

                      <IconButton
                        size="small"
                        // onClick={handleChange(invoice._id)}
                        onClick={() => deleteInvoice(invoice)}
                        sx={{
                          width: "35px",
                          height: "35px",
                          marginLeft: "auto",
                        }}
                      >
                        <DeleteTwoToneIcon sx={{ color: "#fff" }} />
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ background: "#1A2027", color: "#fff" }}
                    >
                      <Typography>{invoice.invoice_notes}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
