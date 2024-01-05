<template>
  <section
    class="
      min-h-max
      p-10
      absolute
      w-1/2
      card card-bordered
      shadow-2xl
      bg-white
      mb-0
    "
  >
    <div
      class="
        absolute
        top-4
        right-5
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:scale-75
      "
    >
      <svg
        @click="closeModal"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokelinecap="round"
          strokelinejoin="round"
          strokewidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <form @submit.prevent="submitCalc" class="grid grid-cols-2 gap-5">
      <div class="form-control">
        <label class="label">
          <span class="label-text">V</span>
        </label>
        <input
          v-model="v"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">LPF</span>
        </label>
        <input
          v-model="lpf"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">UC</span>
        </label>
        <input
          v-model="uc"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered appearance-none focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">CC</span>
        </label>
        <input
          v-model="cc"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">CON</span>
        </label>
        <input
          v-model="con"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">UN</span>
        </label>
        <input
          v-model="un"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">MD</span>
        </label>
        <input
          v-model="md"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">VA</span>
        </label>
        <input
          v-model="va"
          type="number"
          step="0.01"
          placeholder=""
          class="input input-bordered focusring"
        />
      </div>

      <div
        class="form-control col-span-2 mt-5 flex items-center justify-center"
      >
        <button
          class="
            btn
            bg-green-500
            hover:bg-green-400 hover:text-green-800
            text-green-100
            font-bold
            w-1/2
            shadow-xl
          "
          type="submit"
        >
          Run Calculation
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import useEngineering from "../../composable/Engineering/useEngineering";

export default {
  name: "calc modal",

  setup() {
    const { v, lpf, uc, un, va, md, con, cc, submitCalc, closeModal } =
      useEngineering();

    return {
      v,
      lpf,
      uc,
      un,
      va,
      md,
      con,
      cc,
      submitCalc,
      closeModal,
    };
  },
};
</script>

<style>
</style>