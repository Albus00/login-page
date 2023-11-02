import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';

const url = 'https://bitter-cricket.pockethost.io/'
const pb = new PocketBase(url)

const cookies = new Cookies();

export async function signIn(username: string, password: string) {

  const user = await pb.collection('users').authWithPassword(username, password);

  // User not found
  if (user == null) {
    return false;
  }

  // Save user login to cookies
  cookies.set('user', user, { path: '/' });

  return true;
}

export async function signUp(firstName: string, lastName: string, email: string, username: string, password: string) {

  const user = await pb.collection('users').authWithPassword(username, password);

  // User not found
  if (user == null) {
    return false;
  }

  // Save user login to cookies
  cookies.set('user', user, { path: '/' });

  return true;
}

export function signOut() {
  cookies.remove('user');
}