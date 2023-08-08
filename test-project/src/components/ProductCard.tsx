import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as icons from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexBasis: "30%",
  flexGrow: 1,
  minHeight: "120px",
  boxSizing: "border-box",
  margin: "0 5px 10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ProductCard = ({ product, add, remove, selectedProducts }) => {
  const [count, setCount] = useState(0);
  const maxSelection = 3;

  const IconComponent = icons[product.name] || icons.Add;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMaxSelectionReached = selectedProducts.length >= maxSelection;

  useEffect(() => {
    if (count > maxSelection) {
      setCount(maxSelection);
    }
  }, [count]);

  const handleIncrement = () => {
    if (!isMaxSelectionReached) {
      add({ ...product, icon: IconComponent });
      setCount((prevCount) => Math.min(prevCount + 1, maxSelection));
    }
  };

  const handleDecrement = () => {
    if (count === 0) return;
    remove(product.id);
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <Grid item xs>
      <Item>
        <div style={{ overflow: "hidden" }}>
          <Typography variant={isSmallScreen ? "subtitle1" : "body1"}>
            {product.name}
          </Typography>
        </div>
        <div>
          <IconComponent />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <IconButton
            aria-label="Remove"
            onClick={handleDecrement}
            disabled={count === 0}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton aria-label="cart">
            <StyledBadge
              badgeContent={count}
              color="secondary"
            >
              <ShoppingCartIcon
                sx={{
                  color: isMaxSelectionReached ? "grey" : "#ed6c02",
                }}
              />
            </StyledBadge>
          </IconButton>
          <IconButton
            aria-label="Add"
            onClick={handleIncrement}
            disabled={isMaxSelectionReached}
            className={isMaxSelectionReached ? "add-button-disabled" : ""}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Item>
    </Grid>
  );
};

export default ProductCard;
