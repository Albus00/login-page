/*
To Authenticate users on the client side we need to wrap the application with AuthProvider, 
so that we can use the UseSession hook.
*/
'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}