import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Question from './components/Question';
import AddQuestion from './components/AddQuestion';
import AddModerator from './components/AddModerator';
import EditQuestion from './components/EditQuestion';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/addQuestion" component={AddQuestion} />
          <Route path="/addModerator" component={AddModerator} />
          <Route path="/editQuestion/:id" component={EditQuestion} />
          <Route path="/question/:id" component={Question} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
