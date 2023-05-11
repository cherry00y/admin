import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './App.css'


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Album() {
    useEffect(() => { 
        const token = localStorage.getItem('token');
        fetch("https://rich-cyan-wasp.cyclic.app/authen", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token 
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "Ok") {
                console.log("Authen Success");
            }
            else {
                console.log("Authen failed");
                window.location = '/login';
            }
        }
        );
    }, []);
    
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/login'
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };  

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

  const handleClick = () => {
    setOpen(!open);
  };

    
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}
    >
    <CssBaseline />
    <AppBar position="fixed" open={open} style={{ background: '#795548' }}>
      <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
        > 
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit" //สีไอคอนโปรไฟล์
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            </Menu>
          </div>
        )}
        <FormGroup color='back'>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
                defaultChecked color='default'
              />
              
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
    
    <Drawer variant="permanent" open={open}> 
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        
      >
            
            <ListItemButton onClick={handleClick} component={Link} to="/disease">
              <ListItemIcon>
                <Diversity1Icon />
              </ListItemIcon>
              <ListItemText primary="Disease" />
              <Link href="/disease" variant="body2"/>
            </ListItemButton>
  
            <ListItemButton onClick={handleClick} component={Link} to="/drug">
              <ListItemIcon>
               <MedicationLiquidIcon />
              </ListItemIcon>
              <ListItemText primary="Drug" />
            </ListItemButton>
          </List>
        <Divider />
      </Drawer>
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:15}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/man-smears-elbow-with-healing-dermatological-ointment-after-bruise-skin-problems-acne_160308-6673.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ทอนซิลอักเสบ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        กลุ่มที่มีสาเหตุจากไวรัสมีอาการเจ็บคอเล็กน้อยถึงปานกลาง และไม่เจ็บมากขึ้นตอนกลืนอาจมีอาการเป็นหวัดน้ำมูกใส ไอ เสียงแหบ มีไข้ ปวดศรีษะเล็กน้อย ตาแดง บางคนอาจมีอาการท้องเดินหรือถ่ายเหลวร่วมด้วย
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

        <Grid item xs={3}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://i.pinimg.com/564x/1d/ef/c4/1defc48af91dce57c3fd72b51af71874.jpg"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        อาหารเป็นพิษ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        อาหารเป็นพิษจากเชื้อโรคต่างๆ จะมีอาการคล้ายๆกัน คือ ปวดท้องในลักษณะปวดบิดเป็นพักๆ อาเจียน และถ่ายเป็นน้ำบ่อยครั้งบางรายอาจมีไข้และอ่อนเพลียร่วมด้วย โดยทั่วไปถ้าไม่รุนแรงมักจะหายเองใน 24-48 ชั่วโมง
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>
        <br/>
        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/unhealthy-woman-suffer-from-acute-abdominal-pain_160308-3790.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ปวดประจำเดือน
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        จะเริ่มมีอาการก่อนมีประจำเดือนไม่กี่ชั่วโมง และเป็นอยู่ตลอดช่วง 2-3 วันแรกของประจำเดือนโดยมีอาการปวดบิดเป็นพักๆ ที่บริเวณท้องน้อยบางรายอาจมีอาการปวดศรีษะ คลื่นไส้ อาเจียน ท้องเดิน ใจคอหงุดหงิดร่วมด้วย
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>

        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://i.pinimg.com/564x/98/05/a3/9805a3bb5ce76e70bf89529b9d4d243b.jpg"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        โรคกรกดไหลย้อน
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ผู้ป่วยจะมีอาการปวดแสบตรงลิ้นปี่หรือยอดอกหลังกินอาการ 30-60 นาที หรือหลังกินอาหารแล้วล้มตัวลงนอนราบ นั่งงอตัว โค้งตัวลงต่ำ รัดเข็มขัดแน่น หรือใส่กางเกงคับเอวมักมีอาการมากว่า 2 ครั้งต่อสัปดาห์
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>
        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/set-diverse-medications-relieve-illness-symptoms-collection-pills-drugs-syrup_160308-4269.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        แอสไพริน
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ใช้แก้ไข(ตัวร้อน) ปวดหัว ปวดตา ปวดหู ปวดฟัน ปวดหลัง ปวดข้อ ปวดกล้ามเนื้อ ปวดแผล ปวดประจำเดือน ปวดเมื่อ
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>

        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/set-diverse-medications-relieve-illness-symptoms-collection-pills-drugs-syrup_160308-4269.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        คลอร์เฟนิรามีนชนิดเม็ด
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ใช้แก้อาการคัดจมูก น้ำมูกไหล จาม และแก้อาการแพ้ต่างๆ (เช่น ลมพิษ ผื่นคัน แพ้อากาศ แพ้อาหาร แพ้ยา)
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>

        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/set-diverse-medications-relieve-illness-symptoms-collection-pills-drugs-syrup_160308-4269.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ไดเมนไฮดริเนต
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ใช้แก้คลื่นไส้ อาเจียน เมารถ เมาเรือ วิงเวียน กินเมื่อมีอาการและซ้ำได้ทุก 6-8 ชั่วโมง 
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>

        <Grid item xs={3} sx={{p:0}}>
            <Card sx={{ maxWidth: 400}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="250"
                    image ="https://img.freepik.com/premium-vector/set-diverse-medications-relieve-illness-symptoms-collection-pills-drugs-syrup_160308-4269.jpg?size=626&ext=jpg&ga=GA1.1.1621919693.1683534417"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ยาลดกรดชนิดน้ำ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ใช้แก้โรคกระเพาะ แก้อาการปวดแสบท้องเวลาหิวจัดหรืออิ่มจัด แก้ท้องอืด ท้องเฟ้อ เรอเหม็นเปรี้ยว
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>    
        </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  </Box>
    
  );

}