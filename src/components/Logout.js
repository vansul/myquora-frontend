import { Redirect } from 'react-router-dom';
import values from '../Updator';

const Logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('uname');
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('isModerator');
  values.update();

  return <Redirect to="/" />;
};

export default Logout;
