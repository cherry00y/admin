import  React,{ useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function Createdisease() {
    const handleSubmit = event =>  {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "D_Name": name,
        "D_Symptom": symptom,
        "D_Cause": cause,
        "D_Treatment": treatment,
        "D_Treatmentys": treatmentys
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://blue-bright-nightingale.cyclic.app/disease", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['massage'])
            if (result['status'] === 'Ok')
            window.location.href = "/disease"
        })
        .catch(error => console.log('error', error));

    }

    const [name, setName] = useState('');
    const [symptom, setSymptom] = useState('');
    const [cause, setCause] = useState('');
    const [treatment, setTreatment] = useState('');
    const [treatmentys, setTreatmentys] = useState('');
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:10 }}>
            <Paper elevation={3} sx={{p:2}}>
            <Typography variant='h5' gutterBottom component='div'>
                Create Disease
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            id="name" 
                            label="Name Disease" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="symptom" 
                            label="Symptom" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setSymptom(e.target.value)}
                            maxRows={4}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="cause" 
                            label="Cause" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setCause(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="treatment" 
                            label="Treatment" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatment(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="treatmentys" 
                            label="Treatment yourself" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatmentys(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button type='submit' variant='contained'style={{ background: '#4e342e' }} >Create</Button>
                    </Grid>
                </Grid>
                
            </form>
            </Paper>
        </Container>
      </React.Fragment>
    );
  }