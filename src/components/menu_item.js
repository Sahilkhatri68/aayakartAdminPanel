// icons
import AutoAwesomeMosaicTwoToneIcon from "@mui/icons-material/AutoAwesomeMosaicTwoTone";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import MovieTwoToneIcon from "@mui/icons-material/MovieTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import SupportAgentTwoToneIcon from "@mui/icons-material/SupportAgentTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import EditLocationTwoToneIcon from "@mui/icons-material/EditLocationTwoTone";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
import ModeCommentTwoToneIcon from "@mui/icons-material/ModeCommentTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';
import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';

const menu_items = [
  {
    id: "1",
    name: "Dashboard",
    icon: <AutoAwesomeMosaicTwoToneIcon />,
    url: "/",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "2",
    name: "Categories",
    icon: <CategoryTwoToneIcon />,
    url: "/categories",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "tag",
    name: "Tags",             
    icon: <TagTwoToneIcon />,
    url: "/tags",
  },
  {
    id: "pages",
    name: "Pages",
    icon: <CopyAllTwoToneIcon />,
    url: "/pages",
  },
  {
    id: "3",
    name: "Posts",
    icon: <PostAddTwoToneIcon />,
    url: "/posts",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "4",
    name: "Products",
    icon: <ShoppingBagTwoToneIcon />,
    url: "/products",
    sub_menu: [],
  },
  {
    id: "5",
    name: "Orders",
    icon: <ShoppingCartCheckoutTwoToneIcon />,
    url: "/orders",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "6",
    name: "Media & Files",
    icon: <MovieTwoToneIcon />,
    url: "/media",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "7",
    name: "Comments",
    icon: <ForumTwoToneIcon />,
    url: "/comments",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "8",
    name: "Notes",
    icon: <FormatListBulletedTwoToneIcon />,
    url: "/notes",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "9",
    name: "Coupons",
    icon: <LocalOfferTwoToneIcon />,
    url: "/coupons",
    sub_menu: [
      // {
      //   id: "88",
      //   text: "Sub",
      //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
      //   path: "/settings/sub",
      // },
    ],
  },
  {
    id: "10",
    name: "Support",
    icon: <SupportAgentTwoToneIcon />,
    url: "/support",
    sub_menu: [],
  },
  {
    id: "11",
    name: "Invoice",
    icon: <DescriptionTwoToneIcon />,
    url: "/invoice",
    sub_menu: [],
  },
  {
    id: "12",
    name: "Customization",
    icon: <EditLocationTwoToneIcon />,
    url: "/customization",
  },
  // {
  //   id: "a1",
  //   text: "General Settings",
  //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
  //   path: "/settings/General-Settings",
  // },
  // {
  //   id: "a1",
  //   text: "Payment Settings",
  //   icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
  //   path: "/settings/payment-settings",
  // },
  // ],
  // },
  {
    id: "13",
    name: "Users",
    icon: <PeopleTwoToneIcon />,
    url: "/users",
    sub_menu: [],
  },
  {
    id: "14",
    name: "Settings",
    icon: <SettingsTwoToneIcon />,
    url: "/settings",
    sub_menu: [
      {
        id: "sub_smtp",
        name: "SMTP",
        icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
        url: "/settings/smtp",
      },
      {
        id: "sub_payment",
        name: "Payment",
        icon: <ArrowForwardTwoToneIcon sx={{ fontSize: 18 }} />,
        url: "/settings/payment",
      },
    ],
  },
];

export default menu_items;
