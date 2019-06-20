<template>
  <div class="home m-auto">
    <send-invite></send-invite>  
  </div>
</template>

<script>
// @ is an alias to /src
import SendInvite from '@/components/SendInvite.vue'

export default {
  name: 'home',
  components: {
    SendInvite
  }
}
</script>
