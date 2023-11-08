import axios from 'axios';

async function useGetUserIP() {
  const res = await axios.get("https://api.ipify.org/?format=json");
  return (res.data.ip);
}

export default useGetUserIP