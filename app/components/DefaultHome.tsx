import { Box, Container, CssBaseline, ThemeProvider, Typography, Button } from "@mui/material";
import theme from "../lib/theme";

type Props = {}

const DefaultHome = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            'button': { m: 4 }
          }}
        >
          <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
            {"You are not signed in."}
          </Typography>
          <Button variant="contained" color="primary" href="/account/sign-in" size="large" sx={{ mb: 2, px: 8, fontSize: 22 }}>
            I want to sign in
          </Button>
          <Button variant="outlined" color="primary" href="/account/sign-up">
            I don&apos;t have an account
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default DefaultHome