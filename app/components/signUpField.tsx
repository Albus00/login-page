"use client"

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import theme from '@/app/lib/theme'

type Props = {
  errorMsg: string
  handleInputData: Function
}

const SignUpField = (props: Props) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents page from refreshing
    event.preventDefault();
    props.handleInputData({ fName: fName, lName: lName, email: email, password1: password1, password2: password2 });
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
            Sign up
          </Typography>
          {props.errorMsg?.length > 0 ?
            <Alert severity="error">{props.errorMsg}</Alert> : null}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="f_name"
              label="First name"
              name="f_name"
              value={fName}
              onChange={(event) =>
                setFName(event.target.value)
              }
              autoComplete="f-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="l_name"
              label="Last name"
              name="l_name"
              value={lName}
              onChange={(event) =>
                setLName(event.target.value)
              }
              autoComplete="l-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
              value={password1}
              onChange={(event) =>
                setPassword1(event.target.value)
              }
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm password"
              type="password"
              id="password2"
              value={password2}
              onChange={(event) =>
                setPassword2(event.target.value)
              }
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/account/sign-in" variant="body2">
              Already have an account? Sign in here!
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpField