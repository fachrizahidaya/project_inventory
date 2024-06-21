import { Box, Container, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          404
        </Typography>
        <Typography variant="h5">Page Not Found</Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
