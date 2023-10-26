"use client"
import { useSession } from "next-auth/react"
import SignInField from "@/app/components/signInField"

export default function Home() {
  const { data: session } = useSession()

  return (
    <main>

      {session ? (<div>data</div>) : null}

      <SignInField />

    </main>
  )
}