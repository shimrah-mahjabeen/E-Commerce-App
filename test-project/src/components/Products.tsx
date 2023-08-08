import React, { useState, useEffect } from "react";
import { Box, Grid, useMediaQuery, useTheme, Typography } from "@mui/material";
import CartSummary from "./CartSummary";
import ProductCard from "./ProductCard";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = (product) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    } else {
      console.log("You can't select more than three items.");
    }
  };

  const removeProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        justifyContent: "space-evenly",
        flexDirection: isSmallScreen ? "column-reverse" : "row",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: isSmallScreen ? "100%" : "500px" }}>
        {Object.entries(products).map(([category, productsInCategory]) => (
          <Box key={category} sx={{ marginTop: "30px" }}>
            <Typography variant="h6">{category}</Typography>
            <Grid container spacing={2}>
              {productsInCategory.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  add={addProduct}
                  remove={removeProduct}
                  selectedProducts={selectedProducts}
                />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
      <Box>
        <CartSummary selectedProducts={selectedProducts} />
      </Box>
    </Box>
  );
};

export default Products;
