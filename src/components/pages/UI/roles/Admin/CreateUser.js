import React, { useState } from "react";
import RadioButtons from "./RadioButtons";
import RadioButtonContext from "./Contexts/RadioButtonContext";
import SelectContext from "./Contexts/SelectContext";
import Select from "./Select";
import Forms from "./Forms";
import { signup } from "../../../../../scripts/auth";
import "./CreateUser.css"

const CreateUser = props => {
    const [selectClasse, setSelectClasse] = useState(true)
    const [selectValue, setSelectValue] = useState("default")
    const [role, setRole] = useState(null)
    const [state, setState] = useState({
        lname: null,
        fname: null,
        email: null,
        password: null,
        error: ""
    })
    const { lname, fname, email } = state;

    const RbContextValue = {
        selectClasse,
        option: role,
        updateComp: setSelectClasse,
        updateOption: setRole
    }
    const SelectContextValue = {
        selectValue,
        updateSelectValue: setSelectValue
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(email, lname, fname, role, selectValue);

    }

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }
    return (
        <SelectContext.Provider value={SelectContextValue}>
            <RadioButtonContext.Provider value={RbContextValue}>
                <div className="createUser">
                    <form className="createUserForm" onSubmit={handleSubmit}>
                        <Forms onChange={handleChange} />
                        <RadioButtons />
                        {selectClasse
                            ? <Select />
                            : <></>
                        }
                        <button className="submitBtn" type="submit">Ajouter</button>
                    </form>
                </div>
            </RadioButtonContext.Provider>
        </SelectContext.Provider>
    )
}
export default CreateUser