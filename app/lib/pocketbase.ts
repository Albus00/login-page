import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';
import getUserIP from '../hooks/useGetUserIP';

const url = 'https://bitter-cricket.pockethost.io/'
const pb = new PocketBase(url)

const cookies = new Cookies();

export async function signIn(username: string, password: string) { 
  try {
    const user = await pb.collection('users').authWithPassword(username, password);
    
    // Save user login and IP to cookies
    cookies.set('user', user, { path: '/' });
    cookies.set('userIP', await getUserIP(), { path: '/' });
    return true;
    
  } catch (err) {
    // User not found
    return false;
  }

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
    await signIn(email, password);
    return true;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }

  //TODO: Hash password

}

export async function signOut() {
  cookies.remove('user', { path: '/' });
  cookies.remove('userIP', { path: '/' });
}