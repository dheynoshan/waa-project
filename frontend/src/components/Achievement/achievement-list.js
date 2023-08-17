import { useEffect, useState } from "react";
import axios from "axios";
import Achievement from "./achievement";

export default function ProductsList(props) {
    let [state, setState] = useState([]);

    // pass user id from parent
    const getData = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${props.userID}/achievements`);
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
            <button type="button" onClick={addForm}>Add Achievement</button>
            <div>
                {state.map((item) => {
                    return (
                        <Achievement key={item.id} year={item.year} description={item.description} userID={userID} deleteForm={deleteForm} getData={getData} />
                    )
                })}
            </div>
        </div>
    )
}