"use client"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <main>
      <ul className="flex justify-evenly text-xl font-semibold text-black w-full">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/api/auth/signout">Sign Out</Link></li>
        <li><Link href="/server">Server</Link></li>
        <li><Link href="/client">Client</Link></li>
        <li><Link href="/extra">Extra</Link></li>
      </ul>
      <Link href="/account/signin">Sign in with Email</Link>

      {session ? (<div>data</div>) : null}

    </main>
  )
}