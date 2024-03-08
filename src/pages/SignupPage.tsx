import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../firebase/firebase";
import { Alert } from "@mui/material";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/authValidations";
import { useTheme } from "../context/ThemeContext";
import { appTheme } from "../styles/theme";
import { AuthenticationCard, InputField } from "../components";

export const SignUp = () => {
  const { toggledLightMode } = useTheme();
  const theme = toggledLightMode ? appTheme.light : appTheme.dark;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    formError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  const handleSignup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const { username, email, password } = formData;
    const isFormValid =
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password);

    if (!isFormValid) {
      setFormData((prevData) => ({
        ...prevData,
        formError: "All fields are required!",
        usernameError: !validateUsername(username)
          ? "Please enter a valid username (min. 3 characters, no special symbols)."
          : "",
        emailError: !validateEmail(email) ? "Please enter a valid email." : "",
        passwordError: !validatePassword(password)
          ? "Please enter a valid password (min. 8 characters with at least one uppercase letter, number and a special character)."
          : "",
      }));
      return;
    }

    try {
      await signUp(username, email, password);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setFormData((prevData) => ({
          ...prevData,
          emailError: "This email address is already in use.",
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
      [`${field}Error`]: "",
    }));
  };

  return (
    <div
      className="page-container"
      style={{ backgroundColor: theme.background }}
    >
      <AuthenticationCard
        header="Sign Up"
        buttonTitle="Sign Up"
        onClick={handleSignup}
      >
        <InputField
          type="text"
          label="Username"
          placeholder="username"
          helperText={formData.usernameError}
          hasError={!!formData.usernameError}
          value={formData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("username", e.target.value)
          }
        />
        <InputField
          type="email"
          label="Email"
          placeholder="email address"
          helperText={formData.emailError}
          hasError={!!formData.emailError}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", e.target.value)
          }
        />
        <InputField
          type="password"
          label="Password"
          placeholder="password"
          helperText={formData.passwordError}
          hasError={!!formData.passwordError}
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("password", e.target.value)
          }
        />
        {formData.formError && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ backgroundColor: theme.error, fontFamily: "Gill Sans" }}
          >
            {formData.formError}
          </Alert>
        )}
        <div className="link-container">
          <p style={{ color: theme.interactive }}>Already have an account?</p>
          <Link className="link" style={{ color: theme.primary }} to="/login">
            Log In
          </Link>
        </div>
      </AuthenticationCard>
    </div>
  );
};
