import { Box, Button, Container, Typography } from "@mui/material";

const Form = ({ title, textButton, children }) => {
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
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {children}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {textButton}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
