"use client"

import { Box, Container, CssBaseline, ThemeProvider, Typography, Button } from "@mui/material";
import theme from "../lib/theme";

type Props = {
  user: string,
  signOutHandler: Function
}

const ProfileHome = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
            {"Hello " + props.user + "!"}
          </Typography>
          <Button variant="outlined" color="primary" onClick={() => props.signOutHandler()}>
            Sign out
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ProfileHome