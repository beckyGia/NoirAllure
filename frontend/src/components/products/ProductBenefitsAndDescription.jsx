import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme, lighten } from "@mui/material/styles";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, mt: 3, mb: 3, fontSize: "0.9rem" }}>{children}</Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductBenefitsAndDescription = ({ description, benefits }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        mb: 10,
      }}
    >
      <Box
        sx={{
          borderBottom: 0.5,
          borderColor: lighten(theme.palette.text.primary, 0.6),
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="description benefits"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.text.primary,
            },
            "& .MuiTab-root": {
              color: lighten(theme.palette.text.primary, 0.6),
            },
            "& .Mui-selected": {
              color: `${theme.palette.text.primary} !important`,
            },
          }}
        >
          <Tab
            label="Description"
            {...a11yProps(0)}
            sx={{
              mx: "10%",
              fontSize: "1rem",
            }}
          />
          <Tab
            label="Benefits"
            {...a11yProps(1)}
            sx={{
              mx: "10%",
              fontSize: "1rem",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {description}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {benefits}
      </CustomTabPanel>
    </Box>
  );
};

export default ProductBenefitsAndDescription;
