import { Redirect } from 'react-router-dom';
import values from '../Updator';

const Logout = async () => {
  await sessionStorage.removeItem('token');
  await sessionStorage.removeItem('email');
  await sessionStorage.removeItem('uname');
  await sessionStorage.removeItem('loggedIn');
  await sessionStorage.removeItem('isModerator');
  values.update();

  return <Redirect to="/" />;
};

export default Logout;
