import { useState } from "react";
import axios from "axios";

export default function JobExp(props) {
    const [formData, setFormData] = useState({
        startDate: props.startDate,
        endDate: props.endDate,
        companyName: props.companyName,
        jobTitle: props.jobTitle
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
            <label>Start Date:</label>
            <input type="date" onChange={handleChange} value={formData.startDate} />

            <label>End Date:</label>
            <input type="date" onChange={handleChange} value={formData.endDate} />

            <label>Company Name:</label>
            <input type="text" onChange={handleChange} value={formData.companyName} />

            <label>Job Title:</label>
            <input type="text" onChange={handleChange} value={formData.jobTitle} />

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