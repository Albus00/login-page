"use client"
import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut } from "./lib/pocketbase";
import { useEffect, useState } from "react";


export default function Page() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Mount components depending on cookies after render, to avoid hydration error
    const cookies = new Cookies();
    if (cookies.get('user') != null) {
      console.log(cookies.get('user'));
      setUser(cookies.get('user').record.name);
    }

  }, [])

  function signOutHandler() {
    signOut();
    window.location.reload();
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