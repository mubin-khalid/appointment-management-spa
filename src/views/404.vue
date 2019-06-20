<template>
  <div class="antialiased font-sans w-full">
    <div class="md:flex min-h-screen">
      <div class="w-full md:w-1/2 bg-white flex items-center justify-center ">
        <div class="max-w-sm m-8">
          <div class="text-black text-5xl md:text-15xl font-black">404</div>
          <div class="w-16 h-1 bg-purple-light my-3 md:my-6"></div>
          <p class="text-grey-darker text-2xl md:text-3xl font-light mb-8 leading-normal">Sorry, the page you are
            looking for could not be found.</p>
        </div>
      </div>
      <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2">
        <div class="absolute pin bg-cover bg-no-repeat md:bg-left lg:bg-center bg-404">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound"
  }
</script>

<style scoped>
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .pin {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .md\:text-15xl {
    font-size: 9rem;
  }
  .bg-purple-light {
    background-color: #a779e9;
  }
  .font-sans {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .text-grey-darkest {
    color: #3d4852;
  }
  .text-grey-darker {
    color: #606f7b;
  }
  .text-black {
    color: #22292f;
  }
  .font-black {
    font-weight: 900;
  }
  .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .items-center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .justify-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .max-w-sm {
    max-width: 30rem;
  }
</style>