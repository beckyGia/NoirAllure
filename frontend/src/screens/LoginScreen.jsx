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
import CustomInput from "../components/reusable/CustomInput";
import CustomButton from "../components/reusable/CustomButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme, lighten } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ScrollbarWrapper from "../components/reusable/ScrollBarWrapper";

const LoginScreen = () => {
  const theme = useTheme();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  const handleCreate = () => {
    navigate("/register");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault(); // Prevent default action on mouse down
  const handleRememberMe = (e) => {
    setChecked(e.target.checked);
    setLoginData((prevData) => ({
      ...prevData,
      rememberMe: e.target.checked,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Field:", name, "Value:", value); // Debugging line to verify input
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {};

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
            Sign in!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: lighten(theme.palette.text.primary, 0.4),
            }}
          >
            Hey there! Sign in to access your Noir Allure Rewards®, Favorites
            and more.
          </Typography>
          <form onSubmit={handleLogin}>
            <CustomInput
              label="Email"
              placeholder="Enter Your Email"
              variant="outlined"
              fullWidth
              required
              error={!!errors.email} // Check if error exists
              errorText={errors.email} // Pass the error message
              startIcon={
                <AccountCircle sx={{ color: theme.palette.text.primary }} />
              }
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              marginB={4}
            />
            <CustomInput
              label="Password"
              placeholder="Enter Your Password"
              variant="outlined"
              fullWidth
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
              value={loginData.password}
              onChange={handleChange}
              marginB={2}
              required
              error={!!errors.password} // Check if error exists
              errorText={errors.password} // Pass the error message
            />
            <FormGroup
              sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ mr: 0 }}
                    checked={checked}
                    onChange={handleRememberMe}
                    sx={{ color: theme.palette.text.primary }}
                  />
                }
                label={
                  <span
                    style={{
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Stay signed In
                  </span>
                }
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 800,
                  mr: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: lighten(theme.palette.text.primary, 0.4),
                }}
              >
                Choose this option if you want to sign in less often on this
                device. For your security, select this option only on your
                personal devices.
              </Typography>
            </FormGroup>
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}
            >
              <CustomButton
                label="Login"
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
            Nice to meet you! Create an account to enjoy exclusive benefits.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
            <CustomButton
              onClick={handleCreate}
              variant="outlined"
              label="Create Account"
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

export default LoginScreen;
