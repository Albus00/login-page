import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';
import getUserIP from '../hooks/useGetUserIP';

const url = 'https://bitter-cricket.pockethost.io/'
export const pb = new PocketBase(url)

const cookies = new Cookies();

export async function signIn(username: string, password: string) {
  try {
    // Use the auth store to store the login token
    const authData = await pb.collection('users').authWithPassword(username, password);

    // Save user login and IP to cookies
    cookies.set('user', authData.record.first_name, { path: '/' });
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

}

export async function signOut() {
  cookies.remove('user', { path: '/' });
  cookies.remove('userIP', { path: '/' });
  pb.authStore.clear();
}