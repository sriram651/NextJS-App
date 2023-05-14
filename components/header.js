import { useRouter } from "next/router";
import React from "react";
import Link from 'next/link';
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

// The authenticate is a function that is called when wallet is connected to reflect authentication in other pages
const Header = ({authenticate}) => {
    const router = useRouter();

    // The name of the page changes based on the pathname
    const [pageName, setPageName] = React.useState("");
    const { isConnected } = useAccount();

    // State variable to modify the data display in header
    const [isAuthenticated, setIsAuthenticated] = React.useState(isConnected);

    React.useEffect(() => {
        if(isConnected) {
            // The wallet connection is stored as boolean in local storage so that all pages and components can access
            localStorage.setItem("authenticated", true);

            // Set state variable to true
            setIsAuthenticated(true);

            // Call the global function to reflect all over application - to view the protected pages
            authenticate(true);
            router.push("/dashboard");
        }
        else {
            localStorage.setItem("authenticated", false);
            setIsAuthenticated(false);
            authenticate(false);
            router.push("/login");
        }
    // This useEffect() has its dependency as isConnected which when modified will run the hook.
    // Unfortunately this hook is not fired as soon as the connection is established since isConnected is not a state variable.
    // Alternatively, tried providing additional functionality to Connectkit button which overwrited its default functionality.
    // Hence we need to manually reload the page for the wallet connection to come to effect.
    }, [isConnected]);

    // By default this hook has no dependecy so it will run at every reload of component
    React.useEffect(() => {
        if (router.pathname == "/dashboard") {
            setPageName("Dashboard");
        }
        else if (router.pathname == "/add") {
            setPageName("Add User");
        }
        else {
            setPageName("");
        }
    })

    return (
        <div className="header">
            <header>
                <nav className="nav-bar">
                    <div className="nav-title">
                        <h1 className="page-name">{pageName}</h1>
                    </div>
                    <div className="links">

                        {/* Display the options only after authenticated */}
                        {isAuthenticated && <Link className={router.pathname == "/dashboard" ? "active" : ""} href="/dashboard">Dashboard</Link>}
                        {isAuthenticated && <Link className={router.pathname == "/add" ? "active" : ""} href="/add">Add User</Link>}
                        
                        <ConnectKitButton />
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;