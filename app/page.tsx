"use client"
import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut } from "./lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserIP from "./hooks/getUserIP";


export default function Page() {
  const { push } = useRouter();
  const [user, setUser] = useState(null);
  let userIP: string | null = null;

  useEffect(() => {
    // Wait for the current IP to be fetched
    waitForIP().then(() => {
      console.log("Current IP: " + userIP);

      // Mount components depending on cookies after render, to avoid hydration error
      const cookies = new Cookies();
      if (cookies.get('user') != undefined && cookies.get('userIP') != undefined) {

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

        console.log(cookies.get('user'));
        setUser(cookies.get('user').record.name);
      }
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

      {user != null ? (
        <div>
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