"use client"

import { useEffect, useState } from 'react';
import { signIn } from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import LoginField from './LoginField'

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
  const [data, setData] = useState({ username: "", password: "" });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents page from refreshing
    event.preventDefault();
    console.log(data);

    // TODO:Fix sign in reloading without signing in

    if (data.username != "" && data.password != "") {
      if (await signIn(data.username, data.password)) {
        // Redirect user to homepage
        try {
          push('/');
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
  };

  return (
    user == "loading" ? (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
      : user == "unset" ? (
        <LoginField errorMsg={errorMsg} handleSubmit={handleSubmit} setData={setData} />)
        : (null)
  );
}