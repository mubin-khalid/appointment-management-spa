import Logout from '@/views/Logout';
import Patients from '@/views/Patients';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Settings from '@/views/Settings';
import SendInvite from '@/views/SendInvite';
import NotFound from '@/views/404';

const routes = [
  {
    path: '/',
    component: SendInvite,
    name: 'invite',
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/patients',
    component: Patients,
    name: 'patients',
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/settings',
    component: Settings,
    name: 'settings',
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    props: true,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' },
]

export default routes
