import { useEffect, useState } from "react";
import axios from "axios";
import JobExp from "./jobexp";

export default function JobExpList(props) {
    let [state, setState] = useState([]);


    // pass user id from parent
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${props.userID}/jobexps`);
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
            <button type="button" onClick={addForm}>Add Job Experience</button>
            <div>
                {state.map(item => {
                    return (
                        <JobExp key={item.id} startDate={item.startDate} endDate={item.endDate} companyName={item.companyName} jobTitle={jobTitle} userID={userID} deleteForm={deleteForm} getData={getData} />
                    )
                })}
            </div>
        </div>
    )
}