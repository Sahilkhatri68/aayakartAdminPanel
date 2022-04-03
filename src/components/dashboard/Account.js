import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Chip from "@mui/material/Chip";
//Icons
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import GTranslateTwoToneIcon from "@mui/icons-material/GTranslateTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  background: "#1A2027",
}));

export default function Account() {
  const [profile, setProfile] = React.useState([]);
  console.log(profile);
  //Get Data
  function getProfileData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`).then((response) => {
      setProfile(response.data);
    });
  }

  React.useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {/* Statistics */}
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: "block" }}>
          <Item
            sx={{
              borderRadius: 1,
              boxShadow: 0,
              alignItems: "center",
              display: "block",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              Account Details
            </Typography>
            <Item sx={{ borderRadius: 1, boxShadow: 0, display: "flex" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderRadius: 1,
                  boxShadow: 0,
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile.dp}
                  sx={{ width: 60, height: 60 }}
                />
                <Item
                  sx={{ display: "block", boxShadow: 0, textAlign: "left" }}
                >
                  <Typography variant="h6">{profile.fname}</Typography>
                  <Typography variant="subtitle1">{profile.title}</Typography>
                </Item>
              </Stack>
            </Item>
          </Item>
        </Grid>

        <Grid item xs={3}>
          <Item sx={{ borderRadius: 1, boxShadow: 0 }}>
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label="Email"
                icon={<EmailTwoToneIcon />}
                color="primary"
                size="small"
                sx={{ margin: 1 }}
                variant="outlined"
              />
              {profile.email}
            </Typography>
            <Typography
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label="Language"
                icon={<GTranslateTwoToneIcon />}
                color="primary"
                size="small"
                sx={{ margin: 1 }}
                variant="outlined"
              />
              {profile.lang}
            </Typography>
            <Typography
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label="Role"
                icon={<VerifiedUserTwoToneIcon />}
                color="primary"
                size="small"
                sx={{ margin: 1 }}
                variant="outlined"
              />
              {profile.role}
            </Typography>
            <Typography
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label="Phone Number"
                icon={<LocalPhoneTwoToneIcon />}
                color="primary"
                size="small"
                sx={{ margin: 1 }}
                variant="outlined"
              />
              {profile.phone}
            </Typography>
            <Typography
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  md: "flex",
                },
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label="Country"
                icon={<PublicTwoToneIcon />}
                color="primary"
                size="small"
                sx={{ margin: 1 }}
                variant="outlined"
              />
              {profile.country}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
