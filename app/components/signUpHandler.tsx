"use client"

import { useState } from 'react';
import { signUp } from '../lib/pocketbase';
import { useRouter } from 'next/navigation';
import usePreventAccess from '../hooks/usePreventAccess';
import SignUpField from './signUpField'
import Loader from './Loader';

export default function SignUpHandler() {
  // Prevent user from accessing page when already signed in
  const [user, setUser] = useState("loading");
  usePreventAccess(setUser);

  const [errorMsg, setErrorMsg] = useState('');
  const { push } = useRouter();

  async function handleInputData(data: {
    fName: string, lName: string, email: string, password1: string, password2: string
  }) {
    if (data.fName == '' || data.lName == '') {
      setErrorMsg("Please input your full name.");
      return;
    }

    if (data.email == '') {
      setErrorMsg("Please input your email.");
      return;
    }
    else if (!validateEmail(data.email)) {
      setErrorMsg("Use a valid email address.");
      return
    }


    if (data.password1 == '') {
      setErrorMsg("Please input a password.");
      return;
    }
    else if (data.password1.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    else if (data.password2 != data.password1) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setUser("loading");

    if (await signUp(data.fName, data.lName, data.email, data.password1)) {
      // Redirect user to homepage
      try {
        push('/');
      } catch (error) {
        console.error(error);
      }
    }
    else {
      setErrorMsg('Email is already in use');
      setUser("unset");
    }

  };

  // Makes sure the email is in correct format
  function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    user == "loading" ? <Loader /> :
      user == "unset" ? <SignUpField errorMsg={errorMsg} handleInputData={handleInputData} /> :
        (null)
  );
}