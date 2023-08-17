import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format, parseISO  } from 'date-fns';
import { useNavigate } from 'react-router';

const NewComponent = ({ mynews }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/news/${id}`);
    }

    console.log(mynews)

    return (
        <Grid container spacing={2}>
            {
                mynews.map(mynew =>
                    <Grid xs={4} key={mynew.id}>
                        <Box >
                            <Card variant='elevation'>
                                <CardContent >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {mynew.title}
                                    </Typography>
                                    {/* <Typography variant="h5" component="div">
                                        {event.type}
                                    </Typography> */}
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {format(new Date(mynew.postedDate), 'yyyy-MM-dd')}
                                    </Typography>
                                    {/* <Typography variant="body2">
                                        Location: {mynew.location}
                                    </Typography> */}
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>handleClick(mynew.id)}>Details</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default NewComponent;