import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import { format } from 'date-fns';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popper from '@mui/material/Popper';

const JobDetails = () => {
    const param = useParams();
    const job_id = param.id;
    const navigate = useNavigate();

    const [job, setJob] = useState({});
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    async function getJobById() {
        const bearer_token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLm1pa2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIyMDQwNTgsImV4cCI6MTY5MjIwNzY1OH0.9Aw6zjLFvbVnPsLbOHzDHqgmEqUlxRehRHnHmHwB2ys`
        try {
            const config = {
                headers: {
                    Authorization: bearer_token
                }
            };
            const res = await axios.get(`http://localhost:8080/api/v1/jobs/${job_id}`, config);
            setJob(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteJobById() {
        const bearer_token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLm1pa2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIyMDQwNTgsImV4cCI6MTY5MjIwNzY1OH0.9Aw6zjLFvbVnPsLbOHzDHqgmEqUlxRehRHnHmHwB2ys`
        try {
            const config = {
                headers: {
                    Authorization: bearer_token
                }
            };
            const res = await axios.delete(`http://localhost:8080/api/v1/jobs/${job_id}`, config);
            navigate('/jobs')
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDeleteClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    const handleDelete = () => {
        deleteJobById()
    }

    const handleNo = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    useEffect(() => {
        getJobById()
    }, [])

    return (
        <div className="details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                Job Detail Page
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto" }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4">
                                    {job.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" onClick={()=> navigate(`/jobs/edit/${job_id}`)}>Edit</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            aria-describedby={id}
                                            onClick={handleDeleteClick}
                                        >
                                            Delete
                                        </Button>
                                        <Popper id={id} open={open} anchorEl={anchorEl} >
                                            {/* <Box sx={{ padding: "1px"}}> */}
                                            <Card sx={{ padding: "1px" }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2">
                                                        Are you sure you want to delete?
                                                    </Typography>
                                                    <div style={{display: "flex", justifyContent: 'end'}}>
                                                        <Button color="error" sx={{ paddingBottom: "0" }} onClick={handleDelete}>Yes</Button>
                                                        <Button color="primary" sx={{ paddingBottom: "0" }} onClick={handleNo}>No</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            {/* </Box> */}
                                        </Popper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Company Name: {job.orgName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Date Posted: {job.datePosted ? format(new Date(job.datePosted), 'yyyy-MM-dd') : 'N/A'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Lacation: {job.city}, {job.state}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1">
                                    Status: {job.status ? "open" : "closed"}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Status: {job.status ? "open" : "closed"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    Job Description:
                                </Typography>
                                <Typography variant="subtitle1" >
                                    {job.details}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: "end" }}>
                                <Button color="secondary">Apply</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default JobDetails;