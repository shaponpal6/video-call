import React from 'react';
import {  AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from '../../components/VideoPlayer';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import Header from '../../components/Header';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const HomePaage = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Header/>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default HomePaage;
