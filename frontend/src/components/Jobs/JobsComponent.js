import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const JobsComponent = () => {
    return (
        <Grid xs={4}>
            {/* <Item>xs=4</Item> */}
            <Box >
                <Card variant='elevation'>
                    <CardContent >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Job Title
                        </Typography>
                        <Typography variant="h5" component="div">
                            Organization Name
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            datePosted
                        </Typography>
                        <Typography variant="body2">
                            status
                            <br />
                            {'"city name"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}

export default JobsComponent;