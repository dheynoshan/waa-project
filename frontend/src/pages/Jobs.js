import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import JobsComponent from '../components/Jobs/JobsComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     // ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    async function getData() {
        // const bearer_token = `Bearer ${localStorage.getItem('token')}`;
        const bearer_token = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLm1pa2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMjYxNjQsImV4cCI6MTY5MjEyOTc2NH0.gNd1yAoAejBib8wQuSn0zrFb1n1cw4cki0lMfBE16Ao`
        try {
            const config = {
                headers: {
                    Authorization: bearer_token
                }
            };
            const res = await axios.get('http://localhost:8080/api/v1/jobs', config); // <== Here we use await keywords to get the result of the Promise, check internet if it's blurry for you
            console.log(res.data)
        } catch (err) {
            // here display a message to the user or something else
            console.error(err.message);
        }
    }

    useEffect(() => {
        // axios.get(`http://localhost:8080/api/v1/jobs`)
        //     .then(res=>{
        //         console.log(res.data)
        //     })
        getData();
    }, [])
    return (
        <div className="jobs">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        {/* <Item>xs=8</Item> */}
                        <Typography variant="h4">
                            Job Portal
                        </Typography>
                    </Grid>
                    <Grid xs={4}>
                        {/* <Item>xs=4</Item> */}
                        <Button variant="outlined">Create +</Button>
                    </Grid>
                    {
                        <>
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                            <JobsComponent />
                        </>
                    }
                </Grid>
            </Box>
        </div>
    )
}

export default Jobs;