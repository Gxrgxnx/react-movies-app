import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { logOut } from "../firebase/firebase";
import { Switch } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { appTheme } from "../styles/theme";
import { Button } from ".";

type NavBarProps = {
  navBarProps: Array<{
    navTo: string;
    title: string;
  }>;
};

const NavigationBar = ({ navBarProps }: NavBarProps) => {
  const { toggledLightMode, toggleThemeChange } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className="nav-bar-container"
      style={{
        backgroundColor: theme.background,
        borderBottomColor: theme.primary,
      }}
    >
      <div className="nav-bar-brand" style={{ color: theme.primary }}>
        MovieStation
      </div>
      <nav>
        {navBarProps.map(({ navTo, title }, i) => (
          <Button
            key={i}
            title={title}
            onClick={title === "Log out" ? handleLogout : () => navigate(navTo)}
            customStyles={{
              marginInline: "0.3em",
              paddingInline: "10px",
              paddingBlock: "5px",
              color:
                location.pathname === navTo ? theme.background : theme.primary,
              backgroundColor:
                location.pathname === navTo ? theme.interactive : "transparent",
              borderColor:
                location.pathname === navTo ? "transparent" : theme.primary,
            }}
          />
        ))}
        <Switch
          checked={toggledLightMode}
          onChange={toggleThemeChange}
          size="small"
          color="default"
          style={{ backgroundColor: theme.primary }}
          icon={<FaSun className="icon" style={{ color: theme.background }} />}
          checkedIcon={
            <FaMoon className="icon" style={{ color: theme.background }} />
          }
        />
      </nav>
    </div>
  );
};

export default NavigationBar;
