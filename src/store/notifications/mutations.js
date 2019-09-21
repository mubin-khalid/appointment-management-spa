export default {
  notification: (state, notifications) => state.notifications = notifications,
  notificationSettings: (state, settings) => state.notificationSettings = settings,
  hooks:(state, hooks) => state.hooks = hooks,
  addHook(state, hooks){
    state.hooks.hooks.push = hooks
    state.hooks.total += 1;
},
  
}