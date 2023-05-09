import React from "react";
import { useRouter } from 'next/router';

const AddUser = () => {

    // All the user's detail is stored in state variable
    const [fullName, setFullName] = React.useState("");
    const [lang, setLang] = React.useState("");
    const [gender, setGender] = React.useState("Male");
    const [company, setCompany] = React.useState("");

    const router = useRouter();

    React.useState(() => {
        // If the authentication value in local storage is false then redirect to login page
        if(localStorage.getItem("authenticated") == false) {
            router.push("/login");
        }
    })

    // Submit function executes when the user Clicks on Add User button
    const submit = (e) => {
        e.preventDefault();

        // Create a new object using the data input from the user and post the stringified object using fetch
        const newUser = {fullName, gender, lang, company};
        fetch("http://localhost:3000/json", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })
        .then(() => {
            // After adding new user push to dashboard page
            router.push("/dashboard");
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