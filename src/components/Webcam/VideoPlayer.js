import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = {
    videoRef: PropTypes.object.isRequired,
    muted: PropTypes.bool
};

const defaultProps = {
    videoRef: {},
    muted: true
};

export default function VideoPlayer(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <video playsInline muted ref={props.videoRef} autoPlay className={classes.video} />
        </React.Fragment>
    );
}

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
  }));