import "./admin.css";
import { useState, useEffect } from "react";
import { RenderIf } from "../RenderIf";

function AdminTable(props){

    const deleteUser = (event) => {
        event.preventDefault();
        console.log(event);
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
                <tr className="tr">
                    <td className="td"> Sangwoo Park </td>
                    <td className="td"> sangwoo.park.2@stonybrook.edu </td>
                    <td className="td"> 100 </td>
                    <td className="td"> 80 </td>
                    <td className="td"> <span className="material-icons" onClick={deleteUser}> delete_outline </span> </td>
                </tr>
                <tr className="tr">
                    <td className="td"> SomeoneElse </td>
                    <td className="td"> someone.else@stonybrook.edu </td>
                    <td className="td"> 20 </td>
                    <td className="td"> 1 </td>
                    <td className="td"> <span className="material-icons" onClick={deleteUser}> delete_outline </span> </td>
                </tr>

            </tbody>

        </table>
    );
}

export default AdminTable;