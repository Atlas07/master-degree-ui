import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      {/* <Route path="/signup" component={Signup} /> */}
      {/* <Route path="/dashboard" component={Dashboard} /> */}
    </Switch>
  </Router>
);

export default App;
