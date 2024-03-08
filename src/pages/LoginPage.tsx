import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../firebase/firebase";
import { Alert } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { appTheme } from "../styles/theme";
import { InputField, AuthenticationCard } from "../components";

export const Login = () => {
  const { toggledLightMode } = useTheme();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    formError: "",
  });

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setFormData((prevData) => ({
      ...prevData,
      emailError: false,
      passwordError: false,
      formError: "",
    }));

    const { email, password } = formData;

    if (!email || !password) {
      setFormData((prevData) => ({
        ...prevData,
        formError: "Please fill in both email and password fields to proceed.",
        emailError: !email,
        passwordError: !password,
      }));
      return;
    }

    try {
      await logIn(email, password);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        setFormData((prevData) => ({
          ...prevData,
          emailError: true,
          passwordError: true,
          formError:
            "Authentication failed. Please ensure your email and password are correct.",
        }));
      } else {
        setFormData((prevData) => ({ ...prevData, formError: error.message }));
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      formError: "",
      [`${field}Error`]: false,
    }));
  };

  return (
    <div
      className="page-container"
      style={{ backgroundColor: theme.background }}
    >
      <AuthenticationCard
        header="Log In"
        buttonTitle="Log In"
        onClick={handleLogin}
      >
        <InputField
          type="email"
          label="Email"
          placeholder="email address"
          helperText={formData.emailError ? "Please enter a valid email" : ""}
          hasError={formData.emailError}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", e.target.value)
          }
        />
        <InputField
          type="password"
          label="Password"
          placeholder="password"
          helperText={
            formData.passwordError ? "Please enter a valid password" : ""
          }
          hasError={formData.passwordError}
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("password", e.target.value)
          }
        />
        <div className="link-container">
          <p style={{ color: theme.interactive }}>Don't have an account?</p>
          <Link className="link" style={{ color: theme.primary }} to="/signup">
            Sign Up
          </Link>
        </div>
        {formData.formError && (
          <Alert
            variant="filled"
            severity="error"
            sx={{
              backgroundColor: theme.error,
              fontFamily: "Gill Sans",
            }}
          >
            {formData.formError}
          </Alert>
        )}
      </AuthenticationCard>
    </div>
  );
};
