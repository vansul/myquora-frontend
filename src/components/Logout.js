import { Redirect } from 'react-router-dom';
import values from '../Updator';

const Logout = ({ updateMe }) => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('isModerator');
  values.update();

  return <Redirect to="/" />;
};

export default Logout;
