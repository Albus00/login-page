"use client"

import { useEffect, useState } from 'react';
import { signIn } from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import LoginField from './LoginField'
import Loader from './Loader';

export default function LoginHandler() {
  const { push } = useRouter();
  const [user, setUser] = useState("loading");

  useEffect(() => {
    const cookies = new Cookies();

    // Stop the user from accessing sign up if they're already logged in
    if (cookies.get('user') != null) {
      setUser(cookies.get('user'));
      try {
        push('/');
      } catch (error) {
        console.error(error);
      }
    }
    else
      setUser("unset"); // User is not logged in, display sign in screen
  }, [push])

  const [errorMsg, setErrorMsg] = useState("");

  async function handleInputData(data: { email: string, password: string }) {
    // Show loading animation
    setUser("loading");

    if (data.email != "" && data.password != "") {

      if (await signIn(data.email, data.password)) {
        //Redirect user to homepage
        try {
          push('/');
          return
        } catch (error) {
          console.error(error);
        }
      }
      else {
        setErrorMsg('Wrong email/username or password');
      }
    }
    else
      setErrorMsg('Fill out all fields');

    // Return to form if user is not authenticated
    setUser("unset");

  };

  return (
    user == "loading" ? <Loader /> :
      user == "unset" ? <LoginField errorMsg={errorMsg} handleInputData={handleInputData} /> :
        (null)
  );
}