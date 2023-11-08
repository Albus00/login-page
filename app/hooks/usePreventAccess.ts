import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "universal-cookie";

function usePreventAccess(setUser: Function) {
  const { push } = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
  
    // Stop the user from accessing sign up if they're already logged in
    if (cookies.get('user') != null) {
       // Set user to activate loading screen
      setUser(cookies.get('user'));
  
      // Navigate user to homepage
      try {
        push('/');
      } catch (error) {
        console.error(error);
      }
    }
    else
      setUser("unset"); // User is not logged in, display login or signup screen    
  }, [push, setUser])
}

export default usePreventAccess