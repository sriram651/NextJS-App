import { useRouter } from "next/router";
import React from "react";
import { useAccount } from "wagmi";

const Login = () => {
    const router = useRouter();
    const {isConnected} = useAccount();

    React.useEffect(() => {
        // If the wallet is connected then value in local storage is set to true and redirect to dashboard page
        if (isConnected) {
            localStorage.setItem("authenticated", true);
            router.push("/dashboard");
        }
    }, [isConnected]);

    return (
        <div className="login">
            <div className="content">
                <h1>Connect to Wallet to continue</h1>
                <div className="images">
                    <img src="https://assets-global.website-files.com/6364e65656ab107e465325d2/637af4c3c39e34a14238d3df_kdoxJEenIzDisUEXbfr5mRTn9db_tKIX7qXkBDhjiEU.jpeg" alt="Connectkit Logo" />
                    <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/knid3ofzvtnf9f6ifg7t" alt="Alchemy Logo" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/180px-MetaMask_Fox.svg.png" alt="Metamask Logo" />
                </div>
            </div>
        </div>
    );
}

export default Login;