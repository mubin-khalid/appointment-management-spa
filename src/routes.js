import Logout from '@/views/Logout';
import Clients from '@/views/Clients';
import Register from '@/views/Register';
import Login from '@/views/Login';
import DTLogin from '@/views/DTLogin';
import Settings from '@/views/Settings';
import SendInvite from '@/views/SendInvite';
import NotFound from '@/views/404';
import Appointment from '@/views/guest/Appointment';
import Suggestions from '@/views/guest/Suggestions';
import VerifyEmail from '@/views/guest/VerifyEmail';
import ResetPassword from '@/views/guest/ResetPassword';
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
    path: '/dashboard',
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
  {
    path: '/appointment/:id/suggestions',
    name: 'suggestion',
    component: Suggestions,
    meta: {
      requiresAuth: false, layout: 'guest-appointment'
    }
  },
  {
    path: '/:id/verify',
    name: 'verify',
    component: VerifyEmail,
    meta: {
      requiresAuth: false, layout: 'guest-appointment'
    }
  },
  {
    path: '/:id/reset',
    name: 'reset',
    component: ResetPassword,
    meta: {
      requiresAuth: false, layout: 'guest-appointment'
    }
  },
  {
    path: '/:id/login',
    name: 'dtLogin',
    component: DTLogin,
    meta: {
      requiresAuth: false
    }
  },
  {path: '/404', component: NotFound, 'name': 'NotFound'},
  {path: '*', redirect: '/404'},
]

export default routes
