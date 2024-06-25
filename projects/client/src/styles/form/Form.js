import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";

const Form = ({ title, textButton, children, onSubmit, isLoading }) => {
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
          <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onSubmit}>
            {isLoading ? <CircularProgress color="inherit" /> : textButton}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
