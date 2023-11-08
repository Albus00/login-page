"use client"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { green, yellow } from '@mui/material/colors';
import { signIn } from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

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
  const cookies = new Cookies();
  const { push } = useRouter();
  const [user, setUser] = useState("loading");

  useEffect(() => {
    // Stop the user from accessing sign up if they're already logged in
    if (cookies.get('user') != null) {
      setUser(cookies.get('user'));
      try {
        push('/');
      } catch (error) {
        console.error(error);
      }
    }
    else
      setUser("unset"); // User is not logged in, display sign in screen
  }, [])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents page from refreshing
    event.preventDefault();

    if (username != "" && password != "") {
      if (await signIn(username, password)) {
        // Redirect user to homepage
        try {
          push('/');
        } catch (error) {
          console.error(error);
        }
      }
      else {
        setErrorMsg('Wrong email/username or password');
      }
    }
    else
      setErrorMsg('Fill out all fields');
  };

  return (
    user == "loading" ? (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
      : user == "unset" ? (
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
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
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
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
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
                <Link href="/account/sign-up" variant="body2">
                  Don&#39;t have an account? Sign up!
                </Link>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (null)
  );
}