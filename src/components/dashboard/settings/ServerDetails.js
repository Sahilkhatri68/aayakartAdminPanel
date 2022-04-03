import axios from "axios";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function ServerDetails() {
  //Axios get request to get the server details
  const [serverDetails, setServerDetails] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/server_info/node_v`)
      .then((res) => {
        setServerDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Axios get request to get the Express version
  const [expressV, setExpressVersion] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/server_info/express_v`)
      .then((res) => {
        setExpressVersion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(expressV.expressVersion);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item
            sx={{
              borderRadius: 1,
              boxShadow: 0,
              background: "#333",
              color: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Node Version: {serverDetails.nodeVersion}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item
            sx={{
              borderRadius: 1,
              boxShadow: 0,
              background: "#333",
              color: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Express Version: {expressV.expressVersion}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServerDetails;
