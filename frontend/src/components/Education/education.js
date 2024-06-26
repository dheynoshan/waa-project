import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";


export default function Education(props) {
    const user = useContext(AuthContext)
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token,
        },
    };
    const [formData, setFormData] = useState({
        startDate: props.startDate ? new Date(props.startDate).toISOString().split('T')[0] : '',
        endDate: props.endDate ? new Date(props.endDate).toISOString().split('T')[0] : '',
        schoolName: props.schoolName,
        degree: props.degree,
        user: {
            id: props.userID,
            role: user.auth.role
        }
    });

    const url = `http://localhost:8080/api/v1/users/${props.userID}/educations`

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
        e.preventDefault()
        try {
            await axios.delete(url + '/' + props.id, config)
            props.getData();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }


    return (
        <form>
            <label>Start Date:</label>
            <input type="date" name="startDate" onChange={handleChange} value={formData.startDate} />

            <label>End Date:</label>
            <input type="date" name="endDate" onChange={handleChange} value={formData.endDate} />

            <label>School Name:</label>
            <input type="text" name="schoolName" onChange={handleChange} value={formData.schoolName} />

            <label>Degree Type:</label>
            <input type="text" name="degree" onChange={handleChange} value={formData.degree} />

            {props.id ? (
                <button onClick={handleSubmit}>Update</button>
            ) : (
                <button onClick={handleSubmit}>Create</button>
            )}

            <button onClick={deleteItem}>Delete</button>
        </form>

    )
}