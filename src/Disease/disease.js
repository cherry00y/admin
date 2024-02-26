import React,{useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { lightBlue, red } from '@mui/material/colors';


export default function SimpleContainer() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        Deleteget()
      }, [])

      const Deleteget = () => {
        fetch("https://rich-cyan-wasp.cyclic.app/tabledisease")
          .then(res => res.json())
          .then(
            (result) => {
              setItems(result.data);
              console.log(result.data)
            },
          )
      }
      const Update = id =>{
        window.location = '/editdisease/'+id
      }

      const Delete = id => {
        console.log(id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "D_ID": id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://rich-cyan-wasp.cyclic.app/delete", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert("delete ="+id)
            if(result['status'] === 'Delete success'){
                Deleteget()
            }
        })
        .catch(error => console.log('error', error));
      }
  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p:3 }}>
        <Paper sx={{ p:2 }}>
            <Box display='flex'>
                <Box sx={{ flexGrow: 1 }}> 
                    <Typography variant="h6" gutterBottom>
                        Admin
                    </Typography>
                </Box>
                <Box>
                    <Link href="createdisease">
                        <Button variant="contained" style={{ background: '#4e342e' }}>Create</Button>
                    </Link>
                </Box>
            </Box>
            <br/>
            <TableContainer component={Paper} sx={{ P:2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow style={{ background: '#a1887f' }}>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Disease Name</TableCell>
                        <TableCell align="left">Symptom</TableCell>
                        <TableCell align="left">Cause</TableCell>
                        <TableCell align="left">Treatment</TableCell>
                        <TableCell align="left">Treat yourself</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.D_ID}
                        </TableCell>
                        <TableCell align="left">{row.D_Name}</TableCell>
                        <TableCell align="left">{row.D_Symptom.substring(0,30)}</TableCell>
                        <TableCell align="left">{row.D_Cause.substring(0,40)}</TableCell>
                        <TableCell align="left">{row.D_Treatment.substring(0,40)}</TableCell>
                        <TableCell align="left">{row.D_Treatmentys.substring(0,40)}</TableCell>
                        <TableCell align="right">
                            <ButtonGroup variant="text" aria-label="text button group" > 
                                <Button onClick={() => Update(row.D_ID)} >Edit</Button>
                                <Button onClick={() => Delete(row.D_ID)} color="error">Del</Button>
                            </ButtonGroup>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Link href="home">
              <IconButton aria-label="delete" size="small">
                  <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Link>
        </Paper>
      </Container>
    </React.Fragment>
  );
}