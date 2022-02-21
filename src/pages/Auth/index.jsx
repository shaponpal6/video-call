import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { SocketContext } from '../../Context';
import { Button, Grid, Typography, Container, Box  } from '@material-ui/core';
// import SignUp from './SignUp';

const propTypes = {};

const defaultProps = {};

export default function AuthPage(props) {
    const { signInAnonymously } = useContext(SocketContext);
    // const [page, setPage] = useState('');

    useEffect(() =>{
        // signInAnonymously()
    }, [])

    return (
        <React.Fragment>
            <Container>
            <div style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
                >
                    <Button variant="contained" color="secondary" onClick={signInAnonymously}>Join As Guest</Button>
                </div>
            </Container>
        </React.Fragment>
    );
}

AuthPage.propTypes = propTypes;
AuthPage.defaultProps = defaultProps;