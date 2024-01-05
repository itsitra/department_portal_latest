<template>
  <section>
    <div
      class="
        px-4
        py-12
        mx-auto
        max-w-7xl
        sm:px-6
        md:px-12
        lg:px-24 lg:py-24
        relative
      "
    >
      <div
        class="
          justify-center
          mx-auto
          text-left
          align-bottom
          transition-all
          transform
          relative
          bg-black
          mt-20
          text-white
          sm:align-middle sm:max-w-2xl sm:w-full
        "
      >
        <div class="grid pb-10 px-10 shadow-xl lg:grid-cols-2 rounded-xl">
          <div class="w-full px-6 py-3 col-start-2">
            <div>
              <div class="mt-3 text-left sm:mt-5">
                <div class="inline-flex items-center w-full">
                  <h3
                    class="
                      text-3xl
                      font-bold
                      text-neutral-600
                      font-serif
                      eading-6
                      lg:text-5xl
                    "
                  >
                    SITRA
                  </h3>
                </div>
              </div>
            </div>
            <form @submit.prevent="authLogin" class="mt-6 space-y-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-white">Department Name</span>
                </label>
                <input
                  type="text"
                  v-model="depName"
                  placeholder="Username"
                  class="
                    input input-bordered
                    transition
                    duration-500
                    ease-in-out
                    transform
                    text-black
                    focus:outline-none
                    focus:border-transparent
                    focus:ring-2
                    focus:ring-green-500
                    focus:ring-offset-1
                    focus:ring-offset-green-300
                  "
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-white">Password</span>
                </label>
                <input
                  v-model="pass"
                  type="password"
                  placeholder="Password"
                  class="
                    input input-bordered
                    transition
                    duration-500
                    text-black
                    ease-in-out
                    transform
                    focus:outline-none
                    focus:border-transparent
                    focus:ring-2
                    focus:ring-green-500
                    focus:ring-offset-1
                    focus:ring-offset-green-300
                  "
                />
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="
                    btn
                    mt-4
                    bg-theme-green
                    hover:bg-green-300
                    text-black
                    focus:ring-2 focus:ring-green-500
                  "
                  type="submit"
                >
                  <span v-if="loading" class="animate-bounce h-5 w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <span v-else>Login</span>
                </button>
              </div>
            </form>
          </div>
          <div
            class="
              w-96
              h-96
              block
              lg:-left-16
              -bottom-5
              md:-left-44
              absolute
              shadow-2xl
            "
          >
            <img
              class="object-cover h-full bg-cover rounded-tr-3xl"
              src="../assets/login.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <error
      v-if="error"
      class="absolute top-80 left-98"
      :closeModal="closeError"
    >
      <template v-slot:msg>{{ message }}</template>
    </error>
  </section>
</template>

<script>
import auth from "../composable/auth/login";
import error from "./error.vue";
export default {
  components: { error },
  name: "Login",
  setup() {
    const { depName, pass, login, loading, error, closeError, message } =
      auth();
    // console.log("login");
    const authLogin = () => {
      const j = JSON.stringify({
        Username: depName.value,
        Password: pass.value,
      });

      login(j);
    };
    return {
      login,
      depName,
      pass,
      authLogin,
      loading,
      error,
      closeError,
      message,
    };
  },
};
</script>