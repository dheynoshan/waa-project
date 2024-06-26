import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router";
import { async } from "q";

export default function Achievement(props) {
    const user = useContext(AuthContext)
    const bearer_token = `Bearer ${user.auth.token}`;
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: bearer_token,
        },
    };

    const [formData, setFormData] = useState({
        year: props.year,
        description: props.description,
        user: {
            id: props.userID,
            role: user.auth.role
        }
    });



    const url = `http://localhost:8080/api/v1/users/${props.userID}/achievements`

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.id) {
            await axios.put(url + '/' + props.id, formData, config)
        } else {
            await axios.post(url, formData, config)
        }
        props.getData()
    };


    const deleteItem = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(url + '/' + props.id, config);
            props.getData();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }


    return (
        <form>
            <label>Year:</label>
            <input type="text" name="year" onChange={handleChange} value={formData.year} />

            <label>Description:</label>
            <input type="text" name="description" onChange={handleChange} value={formData.description} />

            {props.id ? (
                <button onClick={handleSubmit}>Update</button>
            ) : (
                <button onClick={handleSubmit}>Create</button>
            )}

            <button onClick={deleteItem}>Delete</button>
        </form>

    )
}