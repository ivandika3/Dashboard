import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems }from './listItems';


import EvalCardGroup from '../EvalCardGroup/EvalCardGroup'
import ChartGroup from '../ChartGroup/ChartGroup'
import SyncDelay from '../SyncDelay/SyncDelay'
import Consensus from '../Consensus/Consensus'
import DanceAccuracyBar from '../DanceAccuracyBar/DanceAccuracyBar';
import UserStats from '../UserStats/UserStats'
import OverallStats from '../OverallStats/OverallStats'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  accelGyro: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row'
  },
  fixedHeight: {
    height: 650,
  },
  fixedHeightEvalCardGroup: {
    height: 500,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const heightEvalCardGroup = clsx(classes.paper, classes.fixedHeightEvalCardGroup);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
            <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              CG4002 Group 4 Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/" exact>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <Paper className={heightEvalCardGroup}>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <Box fontWeight="fontWeightBold">
                          Dance - Realtime
                        </Box>
                      </Typography>
                      <EvalCardGroup />
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <SyncDelay />
                  </Grid>
                  <Grid item xs={4}>
                    <Consensus />
                  </Grid>
                  <Grid item xs={8}>
                    <DanceAccuracyBar/>
                  </Grid>
                  <ChartGroup dancer="1"/>
                  <ChartGroup dancer="2"/>
                  <ChartGroup dancer="3"/>
                </Grid>
                <Box pt={4}>
                </Box>
              </Container>
            </Route>
            <Route path="/users">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <UserStats name="JingXuan"/>
                  </Grid>
                  <Grid item xs={12}>
                    <UserStats name="Hans" />
                  </Grid>
                  <Grid item xs={12}>
                    <UserStats name="JiaJian" />
                  </Grid>
                  <Grid item xs={12}>
                    <UserStats name="Shaun" />
                  </Grid>
                  <Grid item xs={12}>
                    <UserStats name="Ivan" />
                  </Grid>
                </Grid>
                <Box pt={4}>
                </Box>
              </Container>
            </Route>
            <Route path="/stats">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <OverallStats />
                  </Grid>
                </Grid>
                <Box pt={4}>
                </Box>
              </Container>
            </Route>
          </Switch>
          
        </main>
      </div>
    </Router>
    
  );
}

export default Dashboard;