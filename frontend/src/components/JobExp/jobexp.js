import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";


export default function JobExp(props) {
    const user = useContext(AuthContext)
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token,
        },
    };

    const [formData, setFormData] = useState({
        startDate: new Date(props.startDate).toISOString().split('T')[0],
        endDate: new Date(props.endDate).toISOString().split('T')[0],
        companyName: props.companyName,
        jobTitle: props.jobTitle,
        user: {
            id: props.userID,
            role: user.auth.role
        }
    });

    const url = `http://localhost:8080/api/v1/users/${props.userID}/jobexps`

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
        axios.delete(url + '/' + props.id, config)
        props.getData()
    }


    return (
        <form>
            <label>Start Date:</label>
            <input type="date" name="startDate" onChange={handleChange} value={formData.startDate} />

            <label>End Date:</label>
            <input type="date" name="endDate" onChange={handleChange} value={formData.endDate} />

            <label>Company Name:</label>
            <input type="text" name="companyName" onChange={handleChange} value={formData.companyName} />

            <label>Job Title:</label>
            <input type="text" name="jobTitle" onChange={handleChange} value={formData.jobTitle} />

            {props.id ? (
                <button onClick={handleSubmit}>Update</button>
            ) : (
                <button onClick={handleSubmit}>Create</button>
            )}

            <button onClick={async () => {
                if (props.id) {
                    deleteItem(props.id)
                } else {
                    props.deleteForm()
                }
            }}>Delete</button>
        </form>

    )
}