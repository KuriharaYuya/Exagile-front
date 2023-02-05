import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useEffect, useState } from "react";
import LoginButton from "../auth/loginButton";
import SignupButton from "../auth/signupButton";
import Router, { useRouter } from "next/router";
import {
  calendarPath,
  charactersPath,
  faqsPath,
  homePath,
  insightsPath,
  loginPath,
  signupPath,
} from "../../utils/routes";
import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { requestLogout } from "../../features/auth/logout";
import ConfirmationModal from "./confirmationModal";

type Props = {
  isLoggedIn: boolean;
};
const Header = ({ isLoggedIn }: Props) => {
  console.log(isLoggedIn, "isLoggedIn");
  const { pathname } = useRouter();
  type MenuItems = { name: string; path: string }[];
  const appItems = [
    { name: "カレンダー", path: calendarPath },
    { name: "FAQ", path: faqsPath },
    { name: "気づき", path: insightsPath },
    { name: "人物", path: charactersPath },
  ];
  const [menuItems, setMenuItems] = useState<MenuItems | undefined>(appItems);
  useEffect(() => {
    if (isLoggedIn) {
      setMenuItems(appItems);
    } else {
      setMenuItems(undefined);
    }
  }, [isLoggedIn]);
  // {name: "",path: ""}
  // {name: "Log out",path: "/"}
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (tgtPath?: string) => {
    pathname !== tgtPath && tgtPath && Router.push(tgtPath);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = useState(false);
  const handleLogoutModalOpen = () => {
    setOpen(true);
  };
  const handleLogoutModalClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    await requestLogout();
    handleLogoutModalClose();
    Router.push(homePath);
  };

  return (
    <>
      <ConfirmationModal
        handleClose={handleLogoutModalClose}
        confirmationTxt="ログアウトしますか？"
        execFunc={handleLogout}
        open={open}
      />
      <AppBar position="static" style={{ backgroundColor: "red" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              onClick={() => Router.push(isLoggedIn ? insightsPath : homePath)}
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Exagile
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuItems
                  ?.filter((item) => item.path !== pathname)
                  .map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleCloseNavMenu(item.path)}
                    >
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => Router.push(isLoggedIn ? insightsPath : homePath)}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Exagile
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuItems?.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(item.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="dummy" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={handleLogoutModalOpen}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                {pathname !== loginPath && <LoginButton />}
                {pathname !== signupPath && <SignupButton />}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
