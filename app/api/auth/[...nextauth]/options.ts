// Recources:
// https://stackoverflow.com/questions/63426464/how-to-use-svelte-store-with-react-js

import PocketBase from 'pocketbase';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [        
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Username or email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {

              if (credentials === undefined)
                return null;

              // Fetch user API
              const url = 'https://bitter-cricket.pockethost.io/'
              const pb = new PocketBase(url)
              
              // Check if credentials are correct with the PB authentication method. Either returns null or a user.
              return (await pb.collection('users').authWithPassword(credentials.username, credentials.password)).record;
            }
        })
    ],
    callbacks: {
      }
}