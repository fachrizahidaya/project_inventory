import { Container, Grid } from "@mui/material";

import Copyright from "../utils/Copyright";

const Content = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {children}
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Content;
