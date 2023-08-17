import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import JobsComponent from '../components/Jobs/JobsComponent';
import CustomPagination from '../components/CustomPagination';
import axios from 'axios';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const user = useContext(AuthContext)
    const navigate = useNavigate();

    const itemsPerPage = 6;
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    const filters = [
        {
            value: 'none',
            label: 'None',
        },
        {
            value: 'state',
            label: 'State',
        },
        {
            value: 'city',
            label: 'City',
        },
        {
            value: 'orgName',
            label: 'Company Name',
        },
    ]


    async function getJob() {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/jobs', config);
            setJobs(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getJobByFilter() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/jobs/filters?${filter}=${searchKeyword}`, config);
            setJobs(res.data)
            setFilter('')
            setSearchKeyword('')

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getJob();
    }, [])


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = () => {
        getJobByFilter()
    }

    return (
        <div className="jobs">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Job Portal
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container spacing={2} >
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    defaultValue="none"
                                    helperText="Please select your filter"
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    {filters.map((option) => (
                                        <MenuItem key={option.value} value={option.value}  >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <Button
                                    variant="outlined"
                                    sx={{ padding: "5px" }}
                                    onClick={handleSearch}
                                    disabled={filter === '' || searchKeyword === ''}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} >
                        <Button variant="outlined" onClick={() => navigate('/jobs/create')}>Create +</Button>
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
