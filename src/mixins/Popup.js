const mixin = {
  methods: {
    popup(title, type, duration) {
      this.$swal({
        title: title,
        type: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: duration
      });
    }
  }
}

export default mixin