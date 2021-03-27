import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';

const routes = [
  {
    path:'/',
    component: Login,
    isPrivate: false,
  },
  {
    path:'/register',
    component: Register,
    isPrivate: false,
  },
  {
    path:'/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    path:'/*',
    component: PageNotFound,
    isPrivate: true,
  },
]
 
export default routes;