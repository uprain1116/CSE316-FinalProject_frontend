import "./admin.css";
import {  deleteUserAPIMethod } from "../../api/client";


function AdminTable(props){

    const deleteUser = (event) => {
        event.preventDefault();
        deleteUserAPIMethod(event.target.id).then((result) => {
            console.log('user deleted');
        })
    }


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
                {props.tableData.map((userP) => (
                        <tr className="tr" key = {userP._id}>
                            <td className="td"> {userP.userInfo.name} </td>
                            <td className="td"> {userP.userInfo.email} </td>
                            <td className="td"> {userP.questions.length} </td>
                            <td className="td"> {userP.userLogs === undefined ? 0 : userP.userLogs} </td>
                            <td className="td"> <span className="material-icons" id = {userP._id} onClick={deleteUser}> delete_outline </span> </td>
                        </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AdminTable;