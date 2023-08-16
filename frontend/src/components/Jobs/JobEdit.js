import { useParams } from "react-router";

const JobEdit = () => {
    const params = useParams();

    return (
        <div className="job-edit">JobEdit {params.id}</div>
    )
}

export default JobEdit;