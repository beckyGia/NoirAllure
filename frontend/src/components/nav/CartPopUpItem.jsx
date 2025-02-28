import React, { useState } from "react";
import {
  Drawer,
  List,
  Stack,
  ListItem,
  Typography,
  Button,
  Rating,
  IconButton,
  Box,
  Badge,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { darken } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductImage = styled("img")({
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: 8,
});

const CartItem = styled(ListItem)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CartPopUpItem = ({ item, updateQuantity, removeItem }) => {
  const theme = useTheme();

  return (
    <CartItem key={item.id}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ProductImage
            src={item.image}
            alt={item.name}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111";
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {item.name}
          </Typography>
          <Rating value={item.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            {item.size && `Size: ${item.size}`}
          </Typography>
          <Typography variant="h6" color={theme.palette.secondary.main}>
            ${item.price.toFixed(2)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mt: 1,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <IconButton
              size="small"
              color="error"
              onClick={() => removeItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </CartItem>
  );
};

export default CartPopUpItem;
