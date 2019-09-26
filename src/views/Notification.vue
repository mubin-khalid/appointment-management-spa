<template>
  <div class="w-full rounded px-1 py-3">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="notificationsTab ? active : inactive"
              @click="activateNotifications">
        {{verbiage.notifications}}</span>
      </li>
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="notificationSettingTab ? active : inactive"
              @click="activateNotificationSettings"
        >{{verbiage.settings}}</span>
      </li>
    </ul>
    <notifications v-if="notificationsTab" class="mt-6"></notifications>
    <notification-settings v-if="notificationSettingTab" class="mt-6"></notification-settings>
  </div>
</template>
<script>
  import Notifications from './Notifications'
  import NotificationSettings from './NotificationSettings'
  import {mapGetters} from "vuex";

  export default {
    name: "notification",
    data() {
      return {
        active: 'border-l border-t border-r rounded-t text-gray-700 cursor-not-allowed',
        inactive: 'text-blue-600 hover:text-blue-800',
        notificationsTab: true,
        notificationSettingTab: false,
      }
    },
    components: {
      'notifications': Notifications,
      'notification-settings': NotificationSettings
    },
    computed: {
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
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