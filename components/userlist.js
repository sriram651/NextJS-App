// This reusable componenet is not currently used anywhere in the application.
// Although it was used at the initial Stage of development for data visualization purpose.
// Currently the Table.js component is used for more convenient way of displaying data.

import Link from "next/link";
import React from "react";

// {search, lang, users} - These are props sent from parent component to display the data
const Users = ({ search, lang, users}) => {
    // To show a loading message until the component is rendered.
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(false);
    });

    return (
        <div className="user-grid">

            {/* Loading message is shown at the initial stage of component rendering */}
            {isLoading && <p>Loading...</p>}

            {/* Filter the users based on the Language and Name input from the user */}
            {!isLoading && users.filter((user) => user.fullName.toLowerCase().startsWith(search.toLowerCase()))
                .filter((user) => user.lang.toLowerCase().startsWith(lang.toLowerCase()))
                .map((user) => {
                    return (
                        <div className="item">

                            {/* A link to the particular user page is use to bind the displayed data */}
                            <Link href={`/users/${user.id}`}>
                                <div key={user.id}>
                                    <p>ID: {user.id}</p>
                                    <p>Name: {user.fullName}</p>
                                    <p>Language: {user.lang}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
        </div>
    );
}

export default Users;