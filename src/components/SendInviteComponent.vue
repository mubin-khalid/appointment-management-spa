<template>
    <div class="m-auto bg-white p-6 rounded shadow shadow-2xl shadow-md">
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="language">
                        Language
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="language" type="text" disabled v-model="language">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
                        Date
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="date" type="date" v-model="date">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="time">
                        Time
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="time" type="time" v-model="time">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           for="patient_phone">
                        Client phone number
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="patient_phone" type="text" v-model="patient_phone">
                </div>
            </div>
          <div class="flex flex-wrap -mx-3">
            <div class="w-full px-3 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     for="department">
                Department
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="department" type="text" v-model="department">
            </div>
          </div>
            <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bokn">
                        bokn.
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="bokn" type="text" v-model="bokn">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="ta">
                        translation agency
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="ta" type="text" v-model="ta" disabled>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3  md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           for="message">
                        Message
                    </label>
                    <textarea name="message" id="message" cols="55" rows="8" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"></textarea>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <input type="submit" class="block w-full bg-teal-500 p-3 rounded" value="Send">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "send-invite",
        data() {
            return {
                language: 'English',
                date: '',
                time: '',
                patient_phone: '',
                bokn: '',
                ta: 'Digital Tolk',
                message: '',
            }
        },
        methods: {
            sendInvite() {
                console.log('sending invite')
            }
        },
    }
</script>

<style scoped>

</style>
