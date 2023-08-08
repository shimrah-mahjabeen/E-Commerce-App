import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CartSummary = ({ selectedProducts }) => {
  const calculateTotalAmount = () => {
    const totalAmount = selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );

    return totalAmount.toFixed(2);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledCartSummaryContainer
      sx={{ marginLeft: isMobile ? "20px" : isMediumScreen ? "10px" : "auto" }}
    >
      <Typography variant="h6">Final Pack</Typography>
      {selectedProducts.length > 0 ? (
        <Grid
          container spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {selectedProducts.map((product) => (
            <Grid item key={product.id}>
              <product.icon style={{ width: 30, height: 30 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No product selected</Typography>
      )}
      <Typography>Total Amount: ${calculateTotalAmount()}</Typography>
      <Button variant="contained" color="warning" fullWidth>
        Add to Cart
      </Button>
    </StyledCartSummaryContainer>
  );
};

CartSummary.propTypes = {
  selectedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

const StyledCartSummaryContainer = styled(Paper)(({ theme }) => ({
  marginTop: 70,
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: "#f5f5f5",
}));

export default CartSummary;
