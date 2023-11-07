import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';
import getUserIP from '../hooks/getUserIP';

const url = 'https://bitter-cricket.pockethost.io/'
const pb = new PocketBase(url)

const cookies = new Cookies();

export async function signIn(username: string, password: string) {  
  const user = await pb.collection('users').authWithPassword(username, password);
  
  // User not found
  if (user == null) {
    return false;
  }

  // Save user login and IP to cookies
  cookies.set('user', user, { path: '/' });
  cookies.set('userIP', await getUserIP(), { path: '/' });
  

  return true;
}

export async function signUp(firstName: string, lastName: string, email: string, password: string) {

  const data = {
    email,
    password,
    passwordConfirm: password,
    first_name: firstName,
    last_name: lastName,
  }

  try {
    const createdUser = await pb.collection('users').create(data);
  } catch (error) {
    console.log(error);
    
  }
  await signIn(email, password);

  return true;
}

export function signOut() {
  cookies.remove('user');
  cookies.remove('userIP');
}