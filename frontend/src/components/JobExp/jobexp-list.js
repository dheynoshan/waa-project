import { useContext, useEffect, useState } from "react";
import axios from "axios";
import JobExp from "./jobexp";
import { AuthContext } from "../../App";

import Button from "@mui/material/Button";

export default function JobExpList(props) {
    const user = useContext(AuthContext)
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token,
        },
    };
    let [state, setState] = useState([]);
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${props.userID}/jobexps`, config);
        setState(result.data);
    }

    useEffect(() => {
        getData();
    }, []);

    const addForm = () => {
        setState(prevState => [...prevState, {}]);
    }

    const deleteForm = () => {
        setState(prevState => prevState.slice(0, -1));
    }

    return (
        <div>
            <Button variant="outlined" onClick={addForm} sx={{ marginBottom: '15px' }}> Add Job </Button>
            <div>
                {state.map(item => {
                    return (
                        <JobExp key={item.id} id={item.id} startDate={item.startDate} endDate={item.endDate} companyName={item.companyName} jobTitle={item.jobTitle} userID={props.userID} deleteForm={deleteForm} getData={getData} />
                    )
                })}
            </div>
            <hr />
        </div>
    )
}