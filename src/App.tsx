import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Pages } from './constants/pages';
import { AuthProvider } from './contexts/authContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path={Pages.LOGIN} component={Login} />
        <Route path={Pages.SIGNUP} component={Signup} />
        <Route path={Pages.DASHBOARD} component={Dashboard} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
