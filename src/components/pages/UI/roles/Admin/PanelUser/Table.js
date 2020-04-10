import React, { useEffect, useState } from 'react'
import { db } from "../../../../../../scripts/services/firebase";
import "./Table.css"

const Table = (props) => {
    const [userList, setUserlist] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        handleChange(props.selectState.selectValue)
    }, [])

    const handleChange = (val) => {
        db.collection("users")
            .onSnapshot(function (querySnapshot) {
                const userTab = [];
                querySnapshot.forEach(function (doc) {
                    const { nom, prenom, role } = doc.data()
                    if (role != 'admin') {
                        userTab.push({ nom, prenom, role, uid: doc.id })
                    }
                });
                if (val != "default") {
                    const userTabFilter = userTab.filter(user => user.role === val)
                    setUserlist(userTabFilter)
                } else {
                    setUserlist(userTab)
                }
                setLoading(false)
                props.setSelectState({
                    ...props.selectState,
                    changed: false
                })
            });

    }
    const handleDelete = (event) => {
        props.setUserId(event.target.id)
        props.setDeleteConfirmation(true)
    }
    const renderTableData = () => {
        return userList.map((user) => {
            const { uid, nom, prenom, role } = user //destructuring
            return (
                <tr key={uid}>
                    <td>{prenom} {nom}</td>
                    <td>{role}</td>
                    <td><button id={uid} onClick={handleDelete}>Supprimer</button><button>Modifier</button></td>
                </tr>
            )
        })
    }
    let table =
        <table id='users'>
            <tbody>
                <tr>
                    <th key={0}>Nom et prénom</th>
                    <th key={1}>role</th>
                    <th key={2}>Supprimer / Modifier</th>
                </tr>
                {renderTableData()}
            </tbody>
        </table>

    if (props.selectState.changed) {
        handleChange(props.selectState.selectValue)
    }
    return (
        <div className="list">
            {table}
        </div>
    )
}
export default Table;
