<template>
  <div class="w-full rounded px-1 py-3">
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
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="hooksTab ? active : inactive"
              @click="activateHooks"
        >Webhooks</span>
      </li>
    </ul>
    <notifications v-if="notificationsTab" class="mt-6"></notifications>
    <notification-settings v-if="notificationSettingTab" class="mt-6"></notification-settings>
    <web-hooks v-if="hooksTab" class="mt-6"></web-hooks>
  </div>
</template>
<script>
  import Notifications from './Notifications'
  import NotificationSettings from './NotificationSettings'
  import Webhooks from './Webhooks'
  import {mapGetters} from 'vuex'
  export default {
    name: "NotificationManager",
    data() {
      return {
        active: 'border-l border-t border-r rounded-t text-gray-700 cursor-not-allowed',
        inactive: 'text-blue-600 hover:text-blue-800',
        notificationsTab: true,
        hooksTab: false,
        notificationSettingTab: false,
      }
    },
    components: {
      'notifications': Notifications,
      'web-hooks': Webhooks,
      'notification-settings': NotificationSettings
    },
    computed: {
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
    },
    methods: {
      activateNotifications() {
        this.notificationsTab = true;
        this.notificationSettingTab = false;
        this.hooksTab = false;
      },
      activateNotificationSettings() {
        this.notificationsTab = false;
        this.notificationSettingTab = true;
        this.hooksTab = false;
      },
      activateHooks() {
        this.notificationsTab = false;
        this.notificationSettingTab = false;
        this.hooksTab = true;
      }
    }
  }
</script>