import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

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
import { AuthContext } from "../../App";

const NewsDetails = () => {
    const param = useParams();
    const news_id = param.id;
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const [mynew, setMynew] = useState({});
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    async function getNewsById() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/news/${news_id}`, config);
            setMynew(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteNewsById() {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/news/${news_id}`, config);
            navigate('/news')
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDeleteClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    const handleDelete = () => {
        deleteNewsById()
    }

    const handleNo = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    useEffect(() => {
        getNewsById()
    }, [])

    return (
        <div className="details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                News Detail Page
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto" }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4">
                                    {mynew.title}
                                </Typography>
                            </Grid>
                            {
                                (user.auth.id === mynew.user) &&
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" onClick={() => navigate(`/news/edit/${news_id}`)}>Edit</Button>
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
                                                        <div style={{ display: "flex", justifyContent: 'end' }}>
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
                            }
                            {/* <Grid item xs={12}>
                                <Typography variant="h5">
                                    Company Name: {event.type}
                                </Typography>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Date Posted: {mynew.postedDate ? format(new Date(mynew.postedDate), 'yyyy-MM-dd') : 'N/A'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Details: {mynew.details}
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: "end" }}>
                                <Button color="secondary">Attend</Button>
                            </Grid> */}
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewsDetails;