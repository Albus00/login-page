"use client"
import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut } from "./lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserIP from "./hooks/useGetUserIP";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import theme from '@/app/lib/theme'
import DefaultHome from "./components/DefaultHome";
import ProfileHome from "./components/ProfileHome";
import Loader from "./components/Loader";
import { pb } from "./lib/pocketbase";



export default function Page() {
  const { push } = useRouter();
  const [user, setUser] = useState("loading");
  let userIP: string | null = null;

  useEffect(() => {
    // Wait for the current IP to be fetched
    waitForIP().then(() => {
      // Mount components depending on cookies after render, to avoid hydration error
      const cookies = new Cookies();

      // Check if the user is signed in
      if (pb.authStore.isValid) {
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

        // Get user name
        setUser(cookies.get('user'));
      }
      else
        setUser("unset"); // User is not logged in, display sign in screen
    });

  })

  function signOutHandler() {
    setUser("unset");
    signOut();
  }

  async function waitForIP() {
    userIP = await getUserIP();
  }

  return (
    <main>

      {user == "loading" ? <Loader /> :
        user == "unset" ? <DefaultHome /> :
          <ProfileHome user={user} signOutHandler={signOutHandler} />}

    </main>
  )
}