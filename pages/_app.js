import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { magic } from '../lib/magic-client';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function userLogin() {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        setIsLoading(false);
        router.push('/');
      } else {
        setIsLoading(false);
        router.push('/login');
      }
    }
    userLogin();
  });
  return isLoading ? <div>Loading...</div> : <Component {...pageProps} />;
}

export default MyApp;
