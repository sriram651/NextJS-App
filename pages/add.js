import React from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { useAccount } from "wagmi";

const AddUser = () => {

    // All the user's detail is stored in state variable
    const [fullName, setFullName] = React.useState("");
    const [lang, setLang] = React.useState("");
    const [gender, setGender] = React.useState("Male");
    const [company, setCompany] = React.useState("");

    const {address} = useAccount();

    const router = useRouter();

    React.useState(() => {
        // If the authentication value in local storage is false then redirect to login page
        if (localStorage.getItem("authenticated") == false) {
            router.push("/login");
        }
    })

    // Submit function executes when the user Clicks on Add User button
    const submit = (e) => {
        e.preventDefault();

        // This method is used to replace the POST method in fetch()
        // Sends the data as object and headers
        axios.post("http://localhost:3000/json", {
            fullName, gender, lang, company, address
        }, {
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            router.push("/dashboard");
            router.reload();
        });
    }
    return (
        <div className="add">
            <h2 className="title">Add a new User</h2>

            {/* No Input field validation has been performed */}
            <form className="user-registration" onSubmit={submit}>

                {/* Full Name Input */}
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                {/* Gender - Select dropdown */}
                <label htmlFor="gender">Gender</label>
                <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                </select>

                {/* Language - Input */}
                <label htmlFor="language">Language</label>
                <input
                    type="text"
                    required
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                />

                {/* Company name - Input */}
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <button className="add-btn">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;