import "./admin.css";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";
import { getAllUserAPIMethod } from "../../api/client";


function AdminTable(props){
    const [allUsers, setAllUsers] = useState([]);

    const deleteUser = (event) => {
        event.preventDefault();
        console.log(event);
    }

    useEffect(()=> {
        getAllUserAPIMethod().then((allUsers) => {
            setAllUsers(allUsers);
        })
    }, []);

    return(
        <table id = "adminTable">
            <thead className = "tablehead">
                <tr className="tr">
                    <th className="th" id = "namecol">Name</th>
                    <th className="th" id = "emailcol">Email address</th>
                    <th className="th" id = "questioncol">questions created</th>
                    <th className="th" id = "responsecol">responses logged</th>
                    <th className="th" id = "deletecol">Delete User</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map((user) => (
                    <tr className="tr" key = {user._id}>
                        <td className="td"> {user.userInfo.name} </td>
                        <td className="td"> {user.userInfo.email} </td>
                        <td className="td"> {user.questions.length} </td>
                        <td className="td"> comming soon </td>
                        <td className="td"> <span className="material-icons" onClick={deleteUser}> delete_outline </span> </td>
                    </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AdminTable;