import { Grid, Card, CardContent, Typography } from "@mui/material";
const DashboardCard = (props) => {
    const { heading, number } = props
    return <Grid item >
        <Card sx={{ minWidth: 275, m:2, ml:0 }}>
            <CardContent>
                <Typography variant="h5" component="div" color='primary.dark'>
                    {heading}
                </Typography>
                <Typography variant="h4">
                    {number}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}
export default DashboardCard