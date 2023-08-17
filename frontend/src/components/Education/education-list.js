import { useEffect, useState } from "react";
import axios from "axios";
import Education from "./education";

export default function EducationsList(props) {
    let [state, setState] = useState([]);

    // pass user id from parent
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${props.userID}/educations`);
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
            <button type="button" onClick={addForm}>Add Education</button>
            <div>
                {state.map(item => {
                    return (
                        <Education key={item.id} startDate={item.startDate} endDate={item.endDate} schoolName={item.schoolName} degree={degree} userID={userID} deleteForm={deleteForm} getData={getData} />
                    )
                })}
            </div>
        </div>
    )
}