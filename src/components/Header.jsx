import React, {useContext} from 'react';
import { Button, Grid, Typography, Container,  } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SocketContext } from '../Context';

const propTypes = {};

const defaultProps = {};

export default function Header(props) {
    const classes = useStyles();
    const { signOut } = useContext(SocketContext);
    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}> 
                        <Typography gutterBottom variant="h6">Name</Typography>
                    </Grid>
                    <Grid xs={6} md={4} container direction="row" justifyContent="flex-end" alignItems="center" >
                        <Button variant="contained" color="primary" onClick={signOut}>
                            Sign Out
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
      width: '600px',
      margin: '15px',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
  }));

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;