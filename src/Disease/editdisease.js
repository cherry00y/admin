import  React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';


export default function Editdisease() {
    const { id } = useParams();
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "D_ID":id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://blue-bright-nightingale.cyclic.app/getdisease/", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status === 'ok'){
                setName(result.data[0].D_Name)
                setSymptom(result.data[0].D_Symptom)
                setCause(result.data[0].D_Cause)
                setTreatment(result.data[0].D_Treatment)
                setTreatmentys(result.data[0].D_Treatmentys)
                console.log("OK")
            }
  
        })
        .catch(error => console.log('error', error));
      }, [id])
    
  
    function handleSubmit(event) {
    event.preventDefault();
    var data = {
        'D_ID': id,
        'D_Name': name,
        'D_Symptom': symptom,
        'D_Cause': cause,
        'D_Treatment': treatment,
        'D_Treatmentys': treatmentys,
    };
    fetch('https://rich-cyan-wasp.cyclic.app/editdisease', {
        method: 'POST',
        headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(
            (result) => {
                alert(result['message']);
                if (result['status'] === 'Update success') {
                    window.location.href = '/disease';
                }
            }
        );
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
                Update Disease
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
                            value={name}
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
                            value={symptom}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="cause" 
                            label="Cause" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setCause(e.target.value)}
                            value={cause}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="treatment" 
                            label="Treatment" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatment(e.target.value)}
                            value={treatment}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="treatmentys" 
                            label="Treatment yourself" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatmentys(e.target.value)}
                            value={treatmentys}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button type='submit' variant='contained' style={{ background: '#4e342e' }}>Update</Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
      </React.Fragment>
    );
    }