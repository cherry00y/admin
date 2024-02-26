import  React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';


export default function Editdrug() {
    const { id } = useParams();
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "DI_ID":id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://blue-bright-nightingale.cyclic.app/getdrug/", requestOptions)
        .then(response => response.json())
        .then(result => {
             if(result.status === "ok"){
                setName(result.data[0].DI_Name)
                setProperties(result.data[0].DI_Properties)
                setType(result.data[0].DI_Type)
                setPrice(result.data[0].DI_Price)
                 console.log("OK")
             }
  
        })
        .catch(error => console.log('error', error));
      }, [id])
    
  
    function handleSubmit(event) {
    event.preventDefault();
    var data = {
        'DI_ID': id,
        'DI_Name': namedrug,
        'DI_Properties': properties,
        'DI_Type': type,
        'DI_Price': price,
    };
    fetch('https://rich-cyan-wasp.cyclic.app/editdrug', {
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
                    window.location.href = '/drug';
                }
            }
        );
}
    const [namedrug, setName] = useState('');
    const [properties, setProperties] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:10 }}>
            <Paper elevation={3} sx={{p:2}}>
            <Typography variant='h6' gutterBottom component='div'>
                Update Drug
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
                            value={namedrug}
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
                            value={properties}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="type" 
                            label="Type" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField 
                            id="price" 
                            label="Price" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </Grid>
                    {/* <Grid item xs={12} >
                        <TextField 
                            id="treatmentys" 
                            label="Treatment yourself" 
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setTreatmentys(e.target.value)}
                            value={treatmentys}
                        />
                    </Grid> */}
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