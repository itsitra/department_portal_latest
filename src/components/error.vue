<template>
  <div class="lg:absolute lg:-bottom-24 lg:-right-72">
    <div class="modal-box bg-theme-black">
      <p
        class="
          text-lg
          font-semibold
          leading-snug
          text-theme-green
          flex
          items-center
          justify-center
        "
      >
        <slot name="msg"> </slot>
      </p>
      <div class="modal-action flex items-center justify-center">
        <button
          @click="closeModal"
          class="
            btn btn-sm
            bg-theme-black
            hover:bg-theme-green
            text-theme-green
            hover:text-theme-black
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  props: ["closeModal"],
};
</script>