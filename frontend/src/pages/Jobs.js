import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import JobsComponent from '../components/Jobs/JobsComponent';
import CustomPagination from '../components/Jobs/CustomPagination'; // Replace with the path to your Pagination component
import axios from 'axios';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    async function getData() {
        const bearer_token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLm1pa2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMjYxNjQsImV4cCI6MTY5MjEyOTc2NH0.gNd1yAoAejBib8wQuSn0zrFb1n1cw4cki0lMfBE16Ao`
        try {
            const config = {
                headers: {
                    Authorization: bearer_token
                }
            };
            const res = await axios.get('http://localhost:8080/api/v1/jobs', config);
            setJobs(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="jobs">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Job Portal
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>

                    </Grid>
                    <Grid item xs={4} style={{display: 'flex', justifyContent: 'end'}}>
                        <Button variant="outlined">Create +</Button>
                    </Grid>
                </Grid>
                <JobsComponent jobs={currentJobs} />
                <div className="pagination-container">
                    <CustomPagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={jobs.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Box>
        </div>
    )
}

export default Jobs;
