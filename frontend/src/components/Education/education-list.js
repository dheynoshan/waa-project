import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Education from "./education";
import { AuthContext } from "../../App";
import Button from "@mui/material/Button";

export default function EducationsList(props) {
    const user = useContext(AuthContext)
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token,
        },
    };

    let [state, setState] = useState([]);

    // pass user id from parent
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${props.userID}/educations`, config);
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
            <Button variant="outlined" onClick={addForm} sx={{ marginBottom: '15px' }}> Add Education </Button>
            <div>
                {state.map(item => {
                    return (
                        <Education key={item.id} id={item.id} startDate={item.startDate} endDate={item.endDate} schoolName={item.schoolName} degree={item.degree} userID={props.userID} deleteForm={deleteForm} getData={getData} />
                    )
                })}
            </div>
            <hr />
        </div>
    )
}