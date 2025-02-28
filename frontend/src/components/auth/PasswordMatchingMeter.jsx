import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

const PasswordMatchingCriteria = ({ password, confirmPassword }) => {
  const theme = useTheme();

  const criteria = [
    {
      label: "Passwords match",
      met: password === confirmPassword && password !== "",
    },
  ];

  return (
    <Stack spacing={1} mt={2} mb={2}>
      {criteria.map((item) => (
        <Stack key={item.label} direction="row" alignItems="center">
          {item.met ? (
            <CheckCircle
              sx={{ fontSize: 18, color: theme.palette.success.main, mr: 1 }}
            />
          ) : (
            <Cancel
              sx={{ fontSize: 18, color: theme.palette.error.main, mr: 1 }}
            />
          )}
          <Typography
            variant="body2"
            color={
              item.met ? theme.palette.success.main : theme.palette.text.primary
            }
          >
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const PasswordMatchingMeter = ({ password, confirmPassword }) => {
  const theme = useTheme();

  const getStrength = (pass, pass2) => (pass === pass2 && pass !== "" ? 1 : 0);
  const strength = getStrength(password, confirmPassword);

  const getColor = (strength) =>
    strength === 1 ? theme.palette.success.main : theme.palette.grey[600];
  const getStrengthText = (strength) =>
    strength === 1 ? "Passwords Match" : "Passwords Do Not Match";

  return (
    <Box mt={2}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="body2" color={theme.palette.text.primary}>
          Password Matching
        </Typography>
        <Typography variant="body2" color={theme.palette.text.primary}>
          {getStrengthText(strength)}
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: 6,
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
          backgroundColor: getColor(strength),
        }}
      />

      <PasswordMatchingCriteria
        password={password}
        confirmPassword={confirmPassword}
      />
    </Box>
  );
};

export default PasswordMatchingMeter;
