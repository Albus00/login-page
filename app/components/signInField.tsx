"use client"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { green, yellow } from '@mui/material/colors';
import { signIn } from 'next-auth/react';

const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: yellow[600],
    },
  },
});

export default function SignInField() {
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents page from refreshing
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get('email') != "" && data.get('password') != "") {
        signIn("credentials", { username: data.get('email'), password: data.get('password') })
      }
      else
        throw 'Fill out all fields';

    } catch (e: any) {
      console.log(e);
      setErrorMsg(e);
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMsg.length > 0 ?
            <Alert severity="error">{errorMsg}</Alert> : null}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link href="#" variant="body2">
              Don&#39;t have an account? Sign up!
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}