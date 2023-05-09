import '@/styles/css/globals.css';
import "@/styles/css/navbar.css";
import "@/styles/css/dashboard.css";
import "@/styles/css/Add.css";
import "@/styles/css/profile.css";
import "@/styles/css/login.css";
import "@/styles/css/table.css";
import { useRouter } from 'next/router';
import React from 'react';
import Login from './login';
import Header from '@/components/header';
import { WagmiConfig, createClient } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const alchemyId = process.env.ALCHEMY_ID;

  const client = createClient(
    getDefaultClient({
      appName: "Web App",
      alchemyId,
    }),
  );

  React.useEffect(() => {
    // Checks for the Authentication status from the local storage and decides which page to navigate to.
    if (localStorage.getItem("authenticated") != null) {

      // If Authentication value is true, then redirects to dashboard page
      if (localStorage.getItem("authenticated") == true) {
        setIsAuthenticated(true);
        router.push("/dashboard");
      }

      // Else move to login page
      else if (localStorage.getItem("authenticated") == false) {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }

    // If the value does not even exist then redirects to login page
    else if (localStorage.getItem("authenticated") === null) {
      localStorage.setItem("authenticated", false);
      router.push("/login");
    }
  });

  // Global function to enable display of components here when wallet is disconnected in any page
  function authenticate(value) {
    localStorage.setItem("authenticated", value);
    setIsAuthenticated(value);
  }
  
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div id='root'>
          <Header authenticate={authenticate}/>
          {isAuthenticated && <Component {...pageProps} />}
          {!isAuthenticated && <Login authenticate={authenticate} />}
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
