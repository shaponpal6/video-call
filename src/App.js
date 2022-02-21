import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomePage from './pages/Home';
import { SocketContext } from './Context';
import AuthPage from './pages/Auth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
}));

const App = (props) => {
  const { page, isAuth } = useContext(SocketContext);
  const classes = useStyles();
  console.log('##page :>> ', page);

  return (
    <div className={classes.wrapper}>
      {!isAuth && page === "auth" && <AuthPage/>}
      {  <HomePage/>}
    </div>
  );
};

export default App;
