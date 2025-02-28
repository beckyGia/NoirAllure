// import { CheckCircle, Cancel } from "@mui/icons-material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import { Box, Stack, Typography, useTheme } from "@mui/material";

const PasswordCriteria = ({ password }) => {
  const theme = useTheme();

  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
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

const PasswordStrengthMeter = ({ password }) => {
  const theme = useTheme();

  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return theme.palette.error.main;
    if (strength === 1) return theme.palette.error.light;
    if (strength === 2) return theme.palette.warning.main;
    if (strength === 3) return theme.palette.warning.light;
    return theme.palette.success.main;
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <Box mt={0} mb={2}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="body2" color={theme.palette.text.primary}>
          Password Strength
        </Typography>
        <Typography variant="body2" color={theme.palette.text.primary}>
          {getStrengthText(strength)}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "25%",
              height: 6,
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
              backgroundColor:
                index < strength ? getColor(strength) : theme.palette.grey[600],
            }}
          />
        ))}
      </Stack>

      <PasswordCriteria password={password} />
    </Box>
  );
};

export default PasswordStrengthMeter;
