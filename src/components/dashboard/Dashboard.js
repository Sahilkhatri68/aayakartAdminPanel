import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
//Icons
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import InsightsTwoToneIcon from "@mui/icons-material/InsightsTwoTone";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import axios from "axios";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";

import ViewCount from "../charts/ViewCount";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "#1A2027",
  color: "#fff",
}));

export default function Dashboard() {
  //Axios get
  const [transactions, setTransactions] = React.useState([]);

  function getTransactions() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/transaction_history`)
      .then((response) => {
        setTransactions(response.data);
      });
  }

  React.useEffect(() => {
    getTransactions();
    getCountProducts();
  }, []);

  //Count products
  const [count_products, setCountProducts] = React.useState([]);

  function getCountProducts() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/count`)
      .then((response) => {
        setCountProducts(response.data);
      });
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {/* Statistics */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              Statistics
            </Typography>
            <Card
              sx={{
                minWidth: 100,
                background: "#1A2027",
                color: "#fff",
                height: 100,
                padding: "10px 0px",
              }}
            >
              {/* Sels */}
              <Grid container spacing={1}>
                <Grid item xs={2.4} sx={{ display: "flex" }}>
                  <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        background: "#dbdbdb",
                        ":hover": { background: "#fff" },
                      }}
                    >
                      <InsightsTwoToneIcon />
                    </IconButton>
                  </Item>

                  <Item
                    sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      8.549k
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      Items Sold
                    </Typography>
                  </Item>
                </Grid>

                <Grid item xs={2.4} sx={{ display: "flex" }}>
                  <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        background: "#dbdbdb",
                        ":hover": { background: "#fff" },
                      }}
                    >
                      <EmailTwoToneIcon />
                    </IconButton>
                  </Item>

                  <Item
                    sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      3k
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      Emails Sent
                    </Typography>
                  </Item>
                </Grid>

                {/* Total Users */}
                <Grid item xs={2.4} sx={{ display: "flex" }}>
                  <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        background: "#dbdbdb",
                        ":hover": { background: "#fff" },
                      }}
                    >
                      <GroupTwoToneIcon />
                    </IconButton>
                  </Item>

                  <Item
                    sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      12.59k
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      Total Users
                    </Typography>
                  </Item>
                </Grid>

                {/* Revenue */}
                <Grid item xs={2.4} sx={{ display: "flex" }}>
                  <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        background: "#dbdbdb",
                        ":hover": { background: "#fff" },
                      }}
                    >
                      <PaidTwoToneIcon />
                    </IconButton>
                  </Item>

                  <Item
                    sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      600k INR
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      Revenue
                    </Typography>
                  </Item>
                </Grid>

                {/* Products */}
                <Grid item xs={2.4} sx={{ display: "flex" }}>
                  <Item sx={{ width: "30%", borderRadius: 1, boxShadow: 0 }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        background: "#dbdbdb",
                        ":hover": { background: "#fff" },
                      }}
                    >
                      <ShoppingBagTwoToneIcon />
                    </IconButton>
                  </Item>

                  <Item
                    sx={{ width: "70%", borderRadius: 1, boxShadow: 0, mr: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      {count_products}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                      Products
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Card>
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              All Time Views
            </Typography>
            <ViewCount />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              Last 30 Days Views
            </Typography>
            <ViewCount />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Stack
              spacing={20}
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 1,
                marginRight: 1,
              }}
            >
              <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                Transaction History
              </Typography>
              <Typography
                to="/transactions"
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  ":hover": { color: "primary", textDecoration: "underline" },
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                View All
              </Typography>
            </Stack>
            <Card
              sx={{
                minWidth: 275,
                overflow: "scroll",
                background: "#1A2027",
                height: 200,
                padding: "10px 0px",
              }}
            >
              {transactions.map((transaction) => (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "#4950522c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    height: 40,
                    justifyContent: "space-between",
                    borderBottom: "1px solid #a0a0a0",
                    marginTop: 1,
                  }}
                  size="small"
                  key={transaction._id}
                >
                  <ListItem size="small">
                    <ListItemAvatar>
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {transaction.transaction_status === "success" ? (
                          <CheckCircleTwoToneIcon color="success" />
                        ) : (
                          <ErrorTwoToneIcon color="error" />
                        )}
                      </ListItemIcon>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        transaction.transaction_status === "success"
                          ? "Success"
                          : "Failed.."
                      }
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                    <ListItemText
                      primary={transaction.transaction_currency}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                    <ListItemText
                      primary={transaction.transaction_amount}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                    <ListItemText
                      primary={transaction.transaction_gateway}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                    <ListItemText
                      primary={`@${transaction.user_id}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                    <ListItemText
                      primary={transaction.transaction_date.slice(0, 10)}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                </List>
              ))}
            </Card>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              Dauqu Events
            </Typography>
            <Card
              sx={{
                minWidth: 275,
                overflow: "scroll",
                background: "#1A2027",
                height: 200,
                padding: "10px 0px",
              }}
            >
              {transactions.map((transaction) => (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "#4950522c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    height: 40,
                    justifyContent: "space-between",
                    borderBottom: "1px solid #a0a0a0",
                    marginTop: 1,
                  }}
                  size="small"
                  key={transaction._id}
                >
                  <ListItem size="small">
                    <ListItemAvatar>
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <EmojiEventsTwoToneIcon />
                      </ListItemIcon>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Lorem Ipsum is simply dummy text of the printing and typesetting"
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                        cursor: "pointer",
                      }}
                    />
                    <ListItemText
                      primary="Read More"
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                </List>
              ))}
            </Card>
          </Item>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
}
