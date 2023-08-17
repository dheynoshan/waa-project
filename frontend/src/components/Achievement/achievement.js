import { useState } from "react";
import axios from "axios";

export default function Achievement(props) {
    const [formData, setFormData] = useState({
        year: props.year,
        description: props.description
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
        if (props.key) {
            await axios.put(url + '/' + props.key, formData)
        } else {
            await axios.post(url, formData)
        }
    };


    const deleteItem = async (id) => {
        await axios.delete(url + '/' + id)
        props.getData()
    }


    return (
        <form>
            <label>Year:</label>
            <input type="text" onChange={handleChange} value={formData.year} />

            <label>Description:</label>
            <input type="text" onChange={handleChange} value={formData.description} />

            {props.key ? (
                <button onClick={handleSubmit}>Update</button>
            ) : (
                <button onClick={handleSubmit}>Create</button>
            )}

            <button onClick={async () => {
                if (props.key) {
                    await deleteItem(props.key)
                } else {
                    props.deleteForm()
                }
            }}>Delete</button>
        </form>

    )
}