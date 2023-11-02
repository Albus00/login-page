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
import { useState } from 'react';
import { green, yellow } from '@mui/material/colors';
import { signIn, signUp } from '../lib/pocketbase';
import { useRouter } from 'next/navigation';

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

export default function SignUpField() {
  const [name, setName] = useState(['', '']);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents page from refreshing
    event.preventDefault();

    if (username != "" && password != "") {
      if (await signUp(name[0], name[1], email, username, password)) {
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
            <Link href="#" variant="body2">
              Don&#39;t have an account? Sign up!
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}