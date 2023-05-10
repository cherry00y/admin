import  React,{ useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function Createdrug() {
    const handleSubmit = event =>  {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "DI_Name": namedrug,
        "DI_Properties": properties,
        "DI_Type": type,
        "DI_Price": price,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://rich-cyan-wasp.cyclic.app/drug", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['massage'])
            if (result['status'] === 'Ok')
            window.location.href = "/drug"
        })
        .catch(error => console.log('error', error));

    }

    const [namedrug, setName] = useState('');
    const [properties, setProperties] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    return (
      <React.Fragment >
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:10 }} >
            <Paper elevation={3} sx={{p:2}}>
            <Typography variant='h5' gutterBottom component='div'>
                Create Drug
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            id="namedrug" 
                            label="Name Drug" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="properties" 
                            label="Properties" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setProperties(e.target.value)}
                            maxRows={4}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="type" 
                            label="Type" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="price" 
                            label="Price" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item xs={12} >
                        <TextField 
                            id="treatmentys" 
                            label="Treatment yourself" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatmentys(e.target.value)}
                        />
                    </Grid> */}
                    <Grid item xs={12} >
                        <Button type='submit' variant='contained' style={{ background: '#4e342e' }}>Create</Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
      </React.Fragment>
    );
  }