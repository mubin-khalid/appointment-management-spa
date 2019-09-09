<template>
  <div class="w-full bg-white rounded px-1 py-3">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="notificationsTab ? active : inactive"
              @click="activateNotifications">
        Notifications</span>
      </li>
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="notificationSettingTab ? active : inactive"
              @click="activateNotificationSettings"
        >Settings</span>
      </li>
    </ul>
    <notifications v-if="notificationsTab" class="mt-6"></notifications>
    <notification-settings v-if="notificationSettingTab" class="mt-6"></notification-settings>
  </div>
</template>
<script>
  import Notifications from './Notifications'
  import NotificationSettings from './NotificationSettings'

  export default {
    name: "notification",
    data() {
      return {
        active: 'border-l border-t border-r rounded-t text-blue-700',
        inactive: 'text-blue-500 hover:text-blue-800',
        notificationsTab: true,
        notificationSettingTab: false,
      }
    },
    components: {
      'notifications': Notifications,
      'notification-settings': NotificationSettings
    },
    created() {

    },
    methods: {
      activateNotifications() {
        this.notificationsTab = true;
        this.notificationSettingTab = false;
      },
      activateNotificationSettings() {
        this.notificationsTab = false;
        this.notificationSettingTab = true;
      }
    }
  }
</script>