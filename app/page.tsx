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


  return (
    <main>

      {user != null ? (<p>{user}</p>) : (null)}

      <Link href="/account/signin">Sign in with Email</Link><br />
      <button onClick={() => signOut()} >Sign out</button>

    </main>
  )
}