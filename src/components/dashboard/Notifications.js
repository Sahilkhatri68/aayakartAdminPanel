import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { DeleteOutline } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "#fff",
}));

export default function Notifications() {
  const [notifications, setNotifications] = React.useState([]);
  const [status, setStatus] = React.useState("");

  const getNotifications = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/notifications`)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getNotifications();
  }, []);

  //Update the notifications status to read
  const updateNotificationStatus = (id) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/notifications/${id}`, {
        status: status,
      })
      .then((res) => {
        console.log(res);
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete the notification
  const deleteNotification = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/notifications/${id}`)
      .then((res) => {
        console.log(res);
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item
            sx={{
              display: "flex",
              backgroundColor: "#1A2027",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Box sx={{ fontSize: "h6.fontSize" }}>{notifications.length}</Box>
              <Box sx={{ marginLeft: 2 }}>
                <Box sx={{ fontSize: "h6.fontSize" }}>Notifications</Box>
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <item>
            {notifications.map((notification) => (
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
                key={notification._id}
              >
                <ListItem size="small">
                  <ListItemAvatar>
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        notification.status === "read"
                          ? "Mark as Unread"
                          : "Mark as Read"
                      }
                    >
                      <ListItemIcon
                        onClick={() => {
                          setStatus(
                            notification.status === "read" ? "unread" : "read"
                          );
                          updateNotificationStatus(notification._id);
                        }}
                        sx={{ color: "inherit", cursor: "pointer" }}
                      >
                        {notification.status === "read" ? (
                          <CheckCircleTwoToneIcon color="success" />
                        ) : (
                          <ErrorTwoToneIcon color="info" />
                        )}
                      </ListItemIcon>
                    </Tooltip>
                  </ListItemAvatar>

                  <ListItemText
                    primary={notification.title}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                  <ListItemText
                    primary={notification.description}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                  <ListItemText
                    primary={notification.transaction_gateway}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                  <ListItemText
                    primary={notification.date.slice(0, 10)}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                  <ListItemIcon sx={{cursor: "pointer"}} onClick={
                    () => {
                      deleteNotification(notification._id);
                    }
                  }>
                  <DeleteOutline color="error" />
                  </ListItemIcon>
                </ListItem>
              </List>
            ))}
          </item>
        </Grid>
      </Grid>
    </Box>
  );
}
