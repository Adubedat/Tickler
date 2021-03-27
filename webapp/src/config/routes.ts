import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';

const routes = [
  {
    path:'/',
    component: Login
  },
  {
    path:'/register',
    component: Register
  },
  {
    path:'/dashboard',
    component: Dashboard
  },
  {
    path:'/*',
    component: PageNotFound
  },
]
 
export default routes;