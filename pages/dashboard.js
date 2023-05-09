import React from "react";
import { useRouter } from "next/router";
import Table from "@/components/table";

// The users contains all the details of all the users fetched from the API generated from the getStaticProps()
export default function Home({ users }) {
  const router = useRouter();

  const [userCount, setUserCount] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchLang, setSearchLang] = React.useState("");

  React.useEffect(() => {
    // If the authentication value in local storage is false then redirect to login page
    if (localStorage.getItem("authenticated") == false) {
      router.push("/login");
    }
    else {
      // Set the value of count of users to display on the dashboard page with live updation
      setUserCount(users.length);
    }
  })

  function searchName(e) {
    setSearchValue(e.target.value);
  }

  function searchLanguage(e) {
    setSearchLang(e.target.value);
  }

  return (
    <div id="dashboard">
      <main className="main">
        <div className="user-count">
          <div className="text">
            <span className="title">Subscribed Users</span>
            <span className="count">{userCount}</span>
          </div>
        </div>
        <div className="search-user">
          <div className="input">

            {/* Search box for user to search using Full Name */}
            <label htmlFor="name-search-box">Search with Name</label>
            <input 
              onChange={searchName} 
              id="name-search-box" 
              className="search-box" 
              type="text" 
              placeholder="Search User..." 
              value={searchValue} />
          </div>
          <div className="input">

            {/* Search box for user to search using Language */}
            <label htmlFor="lang-search-box">Search with Language</label>
            <input 
              onChange={searchLanguage} 
              id="lang-search-box" 
              className="search-box" 
              type="text" 
              placeholder="Search Lang..." 
              value={searchLang} />
          </div>
        </div>
        <div className="user-list">

          {/* The below component was used at the initial stage of development for easier visualization of data */}
          {/* <Users search={searchValue} lang={searchLang} users={users} /> */}

          {/* Later on moved to table view to provide more appealing look */}
          <Table search={searchValue} lang={searchLang} users={users}/>
        </div>
      </main>
    </div>
  )
}

// This function generates the array of objects with user details fetched from the provided API endpoint
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/json", {cache: "no-cache"});
  const data = await res.json();

  return {
    props: {
      users: data
    }
  }
}
