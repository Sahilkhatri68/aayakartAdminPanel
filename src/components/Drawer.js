import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./Drawer.scss";
import menu_items from "./menu_item";
import Avatar from "@mui/material/Avatar";
import KeyboardDoubleArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowLeftTwoTone";
import axios from "axios";
import ListItemButton from "@mui/material/ListItemButton";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import Badge from "@mui/material/Badge";
import Transactions from "./dashboard/Transactions";

import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";

//All Pages
import Dashboard from "./dashboard/Dashboard";
import Orders from "./dashboard/Orders";
import Products from "./dashboard/Products";
import Categories from "./dashboard/Categories";
import Users from "./dashboard/Users";
import Settings from "./dashboard/Settings";
import Media from "./dashboard/Media";
import NotFound from "./dashboard/404";
import Notes from "./dashboard/Notes";
import Coupons from "./dashboard/Coupons";
import Support from "./dashboard/Support";
import Invoice from "./dashboard/Invoice";
import Customization from "./dashboard/Customization";
import Posts from "./dashboard/Posts";
import Comments from "./dashboard/Comments";
import Account from "./dashboard/Account";
import Login from "./Login";
import UpdateProduct from "./dashboard/UpdateProduct";
import NewProduct from "./dashboard/AddProduct";
import AddPost from "./dashboard/AddPost";
import Notifications from "./dashboard/Notifications";
import Tags from "./dashboard/Tags";
import Pages from "./dashboard/page/Pages";
import AddPage from "./dashboard/page/AddPage";
import ViewProduct from "./dashboard/ViewProduct";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#1A2027",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  background: "#1A2027",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 0),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

export default function MiniDrawer() {
  const [countNotifications, setCountNotifications] = useState(0);

  //Axios count notifications
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/notifications/unread`)
      .then((res) => {
        setCountNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  //Axios get profile
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`);
    setProfile(res.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const navigate = useNavigate();
  const check_have_token = "http://localhost:4000/login/check_have_token";
  //Axios check have token
  const [logged, setLogged] = useState();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/login/check_have_token`)
      .then((response) => {
        setLogged(response.data);
      });
  }, []);

  //Open full screen

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Appbar */}
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: 0,
          background: "#1A2027",
          borderBottom: "1px solid #333",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {open === true ? (
              <IconButton
                onClick={handleDrawerClose}
                sx={{ color: "#ffffff", marginLeft: 0 }}
              >
                <KeyboardDoubleArrowLeftTwoToneIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            to="/"
            component={RouterLink}
            sx={{ color: "#fff", TextDecoration: "none" }}
          >
            {/* Dashboard */}
          </Typography>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerClose}
            sx={{
              color: "#ffffff",
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            <StyledBadge
              badgeContent={countNotifications}
              color="error"
              to="/notifications"
              component={RouterLink}
              sx={{ color: "#ffffff" }}
            >
              <NotificationsTwoToneIcon />
            </StyledBadge>
          </IconButton>

          <Typography
            variant="subtitle1"
            sx={{ paddingRight: 1, cursor: "pointer" }}
          >
            {profile.fname}
          </Typography>
          <IconButton to="account">
            <Avatar
              alt="Remy Sharp"
              src={profile.dp}
              sx={{ width: 30, height: 30 }}
              to="account"
              component={RouterLink}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{ height: 40, backgroundColor: "rgba(71, 98, 130, 0.2)" }}
      >
        <Toolbar
          variant="dense"
          sx={{
            background: "#1A2027",
            boxShadow: 0,
            height: 40,
            color: "#ffffff",
            borderBottom: "1px solid #333",
          }}
        >
          <DrawerHeader
            sx={{
              color: "#ffffff",
              justifyContent: "center",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                justifyContent: "center",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              Dauswap
            </Typography>
          </DrawerHeader>
        </Toolbar>
        <Divider />

        <Divider />

        {/* Menu List */}
        <List>
          {menu_items.map((item) => (
            <div key={item.id}>
              <ListItemButton
                key={item.label}
                sx={{
                  py: 0,
                  minHeight: 32,
                  color: "rgba(255,255,255,.8)",
                  ":hover": { color: "#ffffff", background: "#333" },
                }}
                to={item.url}
                component={RouterLink}
                className={location.pathname === item.url ? "active" : null}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                  sx={{
                    color: "#ffffff",
                    textAlign: "left",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "left",
                    marginBottom: 1,
                  }}
                />
              </ListItemButton>
            </div>
          ))}
          <div>
            <Outlet />
          </div>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: 3 }}>
        <DrawerHeader />
        {/* Dashboard all pages */}
        <Routes>
          {/* Menu Pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/media" element={<Media />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/support" element={<Support />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-product" element={<NewProduct />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/pages/create" element={<AddPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
          {/* Other pages */}
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}
