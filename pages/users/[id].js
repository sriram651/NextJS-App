import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useAccount } from "wagmi";

// The {user} contains one particular user's details - received from the getStaticProps() method.
const User = ({ user }) => {
    const userEndPoint = "http://localhost:3000/json/" + user.id;
    const router = useRouter();

    const { address } = useAccount();

    // All the user's detail is stored in state variable
    const [fullName, setFullName] = React.useState(user.fullName);
    const [lang, setLang] = React.useState(user.lang);
    const [gender, setGender] = React.useState(user.gender);
    const [company, setCompany] = React.useState(user.company);
    const [isEdit, setIsEdit] = React.useState(false);

    React.useEffect(() => {
        // If the authentication value in local storage is false then redirect to login page
        if (typeof window !== "undefined" && localStorage.getItem("authenticated") == false) {
            router.push("/login");
        }
        if (user.address == "Default" || user.address == address) {
            setIsEdit(true)
        }
    })

    // Function to delete the user permanently
    function deleteUser(e) {
        e.preventDefault();
        // Axios' delete method to replace fetch() DELETE method
        axios.delete(userEndPoint).then(() => {
            // After deleting the user redirect to dashboard
            router.push("/dashboard");
        });
    }

    // Function to update any details of a selected user
    function updateUser(e) {
        e.preventDefault();
        const userId = user.id;
        const newUser = { "id": userId, "fullName": fullName, "gender": gender, "lang": lang, "company": company };
        // Axios' patch method to replace fetch() PATCH method
        axios.patch(userEndPoint, newUser, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            // After updating the user details redirect to dashboard
            router.push("/dashboard");
        });
    }

    return (
        <div className="profile">
            <h1 className="title">User Profile</h1>
            <form id="user-update">

                {/* User ID - Read only */}
                <label htmlFor="user-id">ID Number</label>
                <input
                    disabled
                    type="text"
                    id="user-id"
                    className="inp-box"
                    value={user.id} />

                {/* Full Name */}
                <label htmlFor="user-name">Name</label>
                <input
                    required
                    disabled={!isEdit}
                    type="text"
                    id="user-name"
                    className="inp-box"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} />

                {/* Gender */}
                <label htmlFor="gender">Gender</label>
                <select
                    disabled={!isEdit}
                    name="gender"
                    id="gender"
                    className="inp-box"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)} >

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                </select>

                {/* Language */}
                <label htmlFor="lang">Language</label>
                <input
                    required
                    disabled={!isEdit}
                    type="text"
                    id="lang"
                    className="inp-box"
                    value={lang} onChange={(e) => setLang(e.target.value)} />

                {/* Company Name */}
                <label htmlFor="company">Company</label>
                <input
                    required
                    disabled={!isEdit}
                    type="text"
                    id="company"
                    className="inp-box"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)} />

                {isEdit && <button onClick={(e) => updateUser(e)} className="btn update-btn">Update</button>}

                {isEdit && <button onClick={(e) => deleteUser(e)} className="btn delete-btn">Delete</button>}

                {!isEdit && <p className="access-denied">You have no access to Edit or Delete!</p>}
            </form>
        </div>
    );
}

export default User;

// This built-in function generates all the paths of pages that are required even before the page is loaded
export async function getStaticPaths() {
    const data = await axios.get("http://localhost:3000/json").then((res) => {
        return res.data;
    });

    // Stores all the pathnames in array
    const allPaths = data.map((user) => {
        return {
            params: {
                id: user.id.toString()
            }
        }
    });

    return {
        paths: allPaths,
        fallback: false,
    };
}

// This built-in function generates the user's detail as an object and returns to the component to be displayed.
export async function getStaticProps(context) {
    const data = await axios.get("http://localhost:3000/json").then((res) => {
        return res.data;
    });

    // Gets the URL parameter [id] to filter the user
    const currentId = context.params.id;

    // Filter method used to get the particular user's data
    const currentUser = data.filter((user) => user.id == currentId)[0];

    return {
        props: {
            user: currentUser
        }
    }
}