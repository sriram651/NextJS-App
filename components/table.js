import Link from "next/link";

// {search, lang, users} - These are props sent from parent component to display the data
const Table = ({ search, lang, users }) => {
    return (
        <div className="table-view">
            <div className="title">
                <h2>Click on a User row for more actions</h2>
            </div>
            <div className="table">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Full Name</th>
                            <th>Language</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Filter the users based on the Language and Name input from the user */}
                        {users.filter((user) => user.fullName.toLowerCase().startsWith(search.toLowerCase())).filter((user) => user.lang.toLowerCase().startsWith(lang.toLowerCase())).map((user) => {
                            return (

                                // Key is given to uniquely differentiate between rows
                                <tr key={user.id}>
                                    <td><Link href={`/users/${user.id}`}>{user.id}</Link></td>
                                    <td><Link href={`/users/${user.id}`}>{user.fullName}</Link></td>
                                    <td><Link href={`/users/${user.id}`}>{user.lang}</Link></td>
                                    <td><Link href={`/users/${user.id}`}>{user.company}</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;