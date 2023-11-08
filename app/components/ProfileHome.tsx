"use client"

import { Home } from "@mui/icons-material";
import { Box, Container, CssBaseline, ThemeProvider, Typography, Button } from "@mui/material";
import theme from "../lib/theme";

type Props = {
  user: string,
  signOutHandler: Function
}

const ProfileHome = (props: Props) => {
  return (
    <div>
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
            <Typography component="h1" variant="h5">
              {"Hello " + props.user + "!"}
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => props.signOutHandler()}>
              Sign out
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ProfileHome