import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// import { BeatLoader } from "react-spinners";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaTrash } from "react-icons/fa"
import { useAccount } from "wagmi";

// {search, lang, users} - These are props sent from parent component to display the data
const Table = ({ search, lang, comp, perPageRecord, users }) => {
    const userEndPoint = "http://localhost:3000/json";
    const router = useRouter();
    const { address } = useAccount();

    // Keeps track of Page number array
    const [pageCount, setPageCount] = React.useState(0);
    // Page number of currently displaying page
    const [currentPage, setCurrentPage] = React.useState(1);
    // To set the page number to active state when clicked on
    const [isActive, setIsActive] = React.useState(true);

    // Filter the users based on the input from the users by Name, Language and Company
    const filteredUsers = users.filter((user) => user.fullName.toLowerCase().startsWith(search.toLowerCase())).filter((user) => user.lang.toLowerCase().startsWith(lang.toLowerCase())).filter((user) => user.company.toLowerCase().startsWith(comp.toLowerCase()));

    // Calculate the first and last index of the page displayed
    const lastIndex = currentPage * perPageRecord;
    const firstIndex = lastIndex - perPageRecord;

    // Sort the Filtered users by the column Added By Address and extract only the set number of records using slice
    const displayItems = filteredUsers.sort((user1, user2) => {
        if (user1.hasOwnProperty("address") && user2.hasOwnProperty("address")) {
            return user1.address.toLowerCase().localeCompare(user2.address.toLowerCase());
        }
        else if (user1.hasOwnProperty("address") && !user2.hasOwnProperty("address")) {
            return -1;
        }
        else if (!user1.hasOwnProperty("address") && user2.hasOwnProperty("address")) {
            return 1;
        }
    }).slice(firstIndex, lastIndex);

    // Calculate the total number of pages required to show all the contents
    const totalPages = Math.ceil(filteredUsers.length / perPageRecord);

    // Page number array that changes at every render
    const pageNumbers = [];
    for (let i = pageCount * 10 + 1; i > 0 && i <= (pageCount + 1) * 10 && i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    React.useEffect(() => {
        // Display the first page everytime the user clicks next set of pages.
        setCurrentPage((pageCount * 10) + 1);
    }, [pageCount]);

    function deleteUser(id) {
        // Axios' delete method to replace fetch() DELETE method
        axios.delete(userEndPoint + "/" + id).then(() => {
            // After deleting the user redirect to dashboard
            router.reload();
        });
    }

    function changePage(pageNumber) {
        // On clicking the page number, it shows active state and sets the current page
        setIsActive(true);
        setCurrentPage(pageNumber);
    }

    return (
        <div className="table-view">
            <div className="title">
                <h2>Click on a User row for more actions</h2>
            </div>
            {/* {isLoading && <BeatLoader color="blue" loading={true} />} */}
            <div className="table">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th className="user-id">User Id</th>
                            <th className="name">Full Name</th>
                            <th className="lang">Language</th>
                            <th>Company</th>
                            <th>Added By</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* Filter the users based on the Language and Name input from the user */}
                        {displayItems.map((user) => {
                            return (

                                // Key is given to uniquely differentiate between rows
                                <tr key={user.id}>
                                    <td className="user-id"><Link href={`/users/${user.id}`}>{user.id}</Link></td>
                                    <td className="name"><Link href={`/users/${user.id}`}>{user.fullName}</Link></td>
                                    <td className="lang"><Link href={`/users/${user.id}`}>{user.lang}</Link></td>
                                    <td><Link href={`/users/${user.id}`}>{user.company}</Link></td>
                                    <td><Link href={`/users/${user.id}`}>{user.address ? user.address : "Added by Default"}</Link></td>

                                    {/* The delete button is visible only to the record which are added by the currently logged in user */}
                                    <td>{(user.address ? (user.address == address) : false) && <button onClick={() => deleteUser(user.id)} className="delete"><FaTrash className="delete-icon" /></button>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    {/* No records to display message */}
                    {filteredUsers.length == 0 && <p className="text-center m-4">No Users to display!</p>}
                    <div className="page-numbers">

                        {/* Left arrow is disabled when the first set of pages is displayed */}
                        {totalPages > 10 && <button disabled={pageCount <= 0} onClick={(e) => {
                            e.preventDefault();
                            setPageCount(pageCount - 1);
                        }}><FaArrowAltCircleLeft className="w-full h-full" /></button>}
                        
                        {pageNumbers.map((page) => {
                            return (
                                <button key={page} className={`${isActive} ? "active" : ""`} onClick={() => changePage(page)}>{page}</button>
                            )
                        })}

                        {/* Left arrow is disabled when the last set of pages is displayed */}
                        {totalPages > 10 && <button disabled={pageCount >= (Math.ceil(totalPages / 10) - 1)} onClick={(e) => {
                            e.preventDefault();
                            setPageCount(pageCount + 1);
                        }}><FaArrowAltCircleRight className="w-full h-full" /></button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;