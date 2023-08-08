import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ed6c02",
            py: 1,
          }}
        >
          <Typography variant="h6" component="div">
            Lume
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
