import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  AccountCircle,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import PasswordStrengthMeter from "../components/auth/PasswordStrengthMeter";
import PasswordMatchingMeter from "../components/auth/PasswordMatchingMeter";
import EmailIcon from "@mui/icons-material/Email";
import CustomInput from "../components/reusable/CustomInput";
import CustomButton from "../components/reusable/CustomButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme, lighten } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ScrollbarWrapper from "../components/reusable/ScrollBarWrapper";

const RegisterScreen = () => {
  const theme = useTheme();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordFocused2, setIsPasswordFocused2] = useState(false);

  const handleMouseDownPassword = (e) => e.preventDefault();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const [errors, setErrors] = useState({}); // Object to store error states

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  const handleCreate = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {};

  return (
    <ScrollbarWrapper>
      <Container
        sx={{
          overflowY: "auto",
          width: "26.5rem;",
          height: "80vh",
          backgroundColor: theme.palette.background.default,
          borderRadius: "3rem",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close Sign In"
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            backgroundColor: "inherit",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              // backgroundColor: alpha(theme.palette.text.primary, 0.2),
              color: theme.palette.secondary.primary,
              transform: "rotate(90deg)",
            },
            color: theme.palette.text.primary,
          }}
        >
          <CloseIcon
            sx={{
              color: theme.palette.text.primary,
              fontSize: "2rem",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
          />
        </IconButton>
        <Box sx={{ mt: "2rem", padding: "1rem 2rem" }}>
          <Typography variant="h2" sx={{ fontWeight: 600 }}>
            Create An Account
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: lighten(theme.palette.text.primary, 0.4),
            }}
          >
            Create an account to access your Noir Allure™, Favorites and more.
          </Typography>
          <form onSubmit={handleRegister}>
            <CustomInput
              label="Username"
              placeholder="Enter Your Username"
              variant="outlined"
              fullWidth
              required
              error={!!errors.username} // Check if error exists
              errorText={errors.username} // Pass the error message
              startIcon={
                <AccountCircle sx={{ color: theme.palette.text.primary }} />
              }
              name="username"
              type="text"
              value={registerData.username}
              onChange={handleChange}
              marginB={4}
            />
            <CustomInput
              label="Email"
              placeholder="Enter Your Email"
              variant="outlined"
              fullWidth
              required
              error={!!errors.email} // Check if error exists
              errorText={errors.email} // Pass the error message
              startIcon={
                <EmailIcon sx={{ color: theme.palette.text.primary }} />
              }
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleChange}
              marginB={4}
            />
            <CustomInput
              label="Create Password"
              placeholder="Create Your Password"
              variant="outlined"
              fullWidth
              required
              error={!!errors.password} // Check if error exists
              errorText={errors.password} // Pass the error message
              startIcon={
                <LockIcon sx={{ color: theme.palette.text.primary }} />
              }
              endIcon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword} // Prevent default action
                >
                  {showPassword ? (
                    <Visibility sx={{ color: theme.palette.text.primary }} />
                  ) : (
                    <VisibilityOff sx={{ color: theme.palette.text.primary }} />
                  )}
                </IconButton>
              }
              name="password"
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              marginB={2}
            />

            {isPasswordFocused && (
              <PasswordStrengthMeter password={registerData.password} />
            )}

            <CustomInput
              marginT={2}
              label="Confirm Password"
              placeholder="Confirm Your Password"
              variant="outlined"
              fullWidth
              required
              error={!!errors.password2} // Check if error exists
              errorText={errors.password2} // Pass the error message
              startIcon={
                <LockIcon sx={{ color: theme.palette.text.primary }} />
              }
              endIcon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword} // Prevent default action
                >
                  {showPassword2 ? (
                    <Visibility sx={{ color: theme.palette.text.primary }} />
                  ) : (
                    <VisibilityOff sx={{ color: theme.palette.text.primary }} />
                  )}
                </IconButton>
              }
              name="password2"
              type={showPassword2 ? "text" : "password"}
              value={registerData.password2}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused2(true)}
              onBlur={() => setIsPasswordFocused2(false)}
              marginB={2}
            />

            {isPasswordFocused2 && (
              <PasswordMatchingMeter
                password={registerData.password}
                confirmPassword={registerData.password2}
              />
            )}
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 1 }}
            >
              <CustomButton
                label="Register"
                padding="0.75rem 10rem"
                type="submit"
                borderRadius={"10rem"}
                backgroundColorHover={lighten(
                  theme.palette.secondary.main,
                  0.3
                )}
                textColor={theme.palette.text.contrast}
                backgroundColor={theme.palette.secondary.main}
              />
            </Box>
          </form>
        </Box>
        <Box sx={{ mt: "0.5rem", padding: "1rem 2rem" }}>
          <Typography variant="h2" sx={{ fontWeight: 600 }}>
            Are you new here?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: lighten(theme.palette.text.primary, 0.4),
            }}
          >
            Nice to see you again! Sign in to access exclusive benefits.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
            <CustomButton
              onClick={handleLogin}
              variant="outlined"
              label="Sign In"
              padding="0.75rem 5rem"
              borderRadius={"10rem"}
              backgroundColor="transparent"
              borderColor={theme.palette.secondary.main}
              textColor={theme.palette.secondary.main}
            />
          </Box>
        </Box>
      </Container>
    </ScrollbarWrapper>
  );
};

export default RegisterScreen;
