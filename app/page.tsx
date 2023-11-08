"use client"
import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut } from "./lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserIP from "./hooks/getUserIP";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';



export default function Page() {
  const { push } = useRouter();
  const [user, setUser] = useState("loading");
  let userIP: string | null = null;

  useEffect(() => {
    // Wait for the current IP to be fetched
    waitForIP().then(() => {
      console.log("Current IP: " + userIP);

      // Mount components depending on cookies after render, to avoid hydration error
      const cookies = new Cookies();
      if (cookies.get('user') != null && cookies.get('userIP') != null) {

        // Check if user is logged in on the same IP as previously
        if (cookies.get('userIP') != userIP) {
          // Clear the cookies and redirect user to sign in page if IP does not match
          console.log("IP DOES NOT MATCH");
          signOut();
          try {
            push('/account/sign-in');
          } catch (error) {
            console.error(error);
          }
        }

        console.log(cookies.get('user').record.first_name);
        setUser(cookies.get('user').record.first_name);
      }
      else
        setUser("unset"); // User is not logged in, display sign in screen
    });

  })

  function signOutHandler() {
    signOut();
    window.location.reload();
  }

  async function waitForIP() {
    userIP = await getUserIP();
  }

  return (
    <main>

      {user == "loading" ? (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        : user != "unset" ? (
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
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
              </Container>
            </ThemeProvider>
            <p>{user}</p>
            <button onClick={() => signOutHandler()} >Sign out</button>
          </div>
        ) : (
          <div>
            <Link href="/account/sign-in">Sign in</Link><br />
            <Link href="/account/sign-up">I don&apos;t have an account</Link><br />
          </div>
        )}

    </main>
  )
}