import Logout from '@/views/Logout';
import Clients from '@/views/Clients';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Settings from '@/views/Settings';
import SendInvite from '@/views/SendInvite';
import NotFound from '@/views/404';
import Appointment from '@/views/Appointment';
import Admin from '@/views/admin/Admin';

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
    path: '/clients',
    component: Clients,
    name: 'clients',
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
      requiresAuth: false,
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true, adminAuth: true
    }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/appointment/:id',
    name: 'appointment',
    component: Appointment,
    meta: {
      requiresAuth: false, layout: 'guest-appointment'
    }
  },
  { path: '/404', component: NotFound, 'name': 'NotFound' },
  { path: '*', redirect: '/404' },
]

export default routes
