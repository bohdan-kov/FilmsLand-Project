<template>
  <div class="login__view-inner relative">
    <div
      class="login__view-background h-[100vh] bg-cover bg-center bg-no-repeat filter blur-[10px]"
      :style="{
        backgroundImage: `url(${bgImage})`,
      }"
    ></div>
    <div class="login__view-wrapper">
      <div class="page__container">
        <nav-bar :style="{ top: navTop + 'px' }" class="home__view--nav-bar" />

        <div class="login__view-box absolute inset-0 max-h-screen">
          <div class="login__view-form h-full flex justify-center items-center">
            <div class="w-80 rounded-lg bg-[#12192C] p-8 text-gray-100">
              <p class="text-center text-2xl font-bold">Login</p>
              <form class="mt-6">
                <div class="mt-4">
                  <label for="username" class="block text-sm text-gray-400 mb-1"
                    >Email</label
                  >
                  <div class="register__inner-box relative">
                    <input
                      v-model="email"
                      type="email"
                      placeholder="your@email.com"
                      autocomplete="new-email"
                      class="w-full rounded-md border border-gray-700 bg-gray-900 py-3 px-4 text-gray-100 focus:border-violet-400 outline-none"
                    />
                    <svg
                      v-if="isEmailValid"
                      class="w-[25px] absolute right-[5px] bottom-0 -translate-y-1/2 top-[50%]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                          stroke="#053ba3"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <label v-if="!isEmailValid && inputEmailError" for="confirm_password" class="block text-sm text-[#ff00009e] mb-1">
                    {{ inputEmailError }}
                  </label>
                </div>
                <div class="mt-4">
                  <label for="password" class="block text-sm text-gray-400 mb-1"
                    >Password</label
                  >
                  <div class="registration__input-box relative">
                    <input
                      v-model="password"
                      type="password"
                      autocomplete="new-password"
                      class="w-full rounded-md border border-gray-700 bg-gray-900 py-3 px-4 text-gray-100 focus:border-violet-400 outline-none"
                    />
                    <svg v-if="isPasswordValid" class="w-[25px] absolute right-[5px] bottom-0 -translate-y-1/2 top-[50%]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                          stroke="#053ba3"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <label v-if="!isPasswordValid && inputPasswordError" for="confirm_password" class="block text-sm text-[#ff00009e] mb-1">
                    {{ inputPasswordError }}
                  </label>
                  <div class="flex justify-end text-xs text-gray-400 mt-2 mb-3">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      class="text-sm text-gray-100 no-underline hover:underline hover:decoration-violet-400"
                      >Forgot Password ?</a
                    >
                  </div>
                  <label v-if="messageError" for="confirm_password" class="block text-sm text-[#ff00009e] mb-1">
                    {{ messageError }}
                  </label>
                </div>
                <button
                  @click.self.prevent="handlerLogin"
                  class="block w-full bg-[#053BA3] p-3 text-center text-white rounded-md font-semibold hover:bg-[#04328A] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12192C]"
                >
                  Sign in
                </button>
              </form>
              <div class="flex items-center pt-4">
                <div class="flex-1 h-px bg-gray-700"></div>
                <p class="px-3 text-sm text-gray-400">Login with social accounts</p>
                <div class="flex-1 h-px bg-gray-700"></div>
              </div>
              <div class="flex justify-center mt-4 space-x-2">
                <button
                  aria-label="Log in with Google"
                  class="rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12192C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-5 h-5 fill-current"
                  >
                    <path
                      d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"
                    ></path>
                  </svg>
                </button>
                <button
                  aria-label="Log in with Twitter"
                  class="rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12192C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-5 h-5 fill-current"
                  >
                    <path
                      d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"
                    ></path>
                  </svg>
                </button>
                <button
                  aria-label="Log in with GitHub"
                  class="rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12192C]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-5 h-5 fill-current"
                  >
                    <path
                      d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p class="text-center text-xs text-gray-400 mt-6">
                Don't have an account?
                <router-link
                  to="/authorization/registration"
                  rel="noopener noreferrer"
                  href="#"
                  class="text-sm text-gray-100 no-underline hover:underline hover:decoration-violet-400"
                >
                  Sign up
                </router-link>
              </p>
            </div>
          </div>
        </div>

        <home-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/sections/NavBar.vue";
import bgImage from "@/assets/images/authorization-bg.jpg";
import HomeFooter from "@/components/sections/HomeFooter.vue";
import { login } from "@/services/authService";

export default {
  components: { NavBar, HomeFooter },
  setup() {
    const router = useRouter();

    const navTop = ref(0);
    const email = ref("");
    const password = ref("");

    const inputEmailError = ref("");
    const inputPasswordError = ref("");
    const messageError = ref("");


    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 0 && navTop.value > -60) {
        navTop.value = Math.max(navTop.value - delta, -60);
      } else if (delta < 0 && navTop.value < 0) {
        navTop.value = Math.min(navTop.value - delta, 0);
      }

      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);

      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("id")

      if (token && userId){
        router.push(`/authorization/profile/${userId}`);
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const isEmailValid = computed(() => email.value.length > 3 && email.value.includes("@"));
    const isPasswordValid = computed(() => password.value.length > 6);



    const handlerLogin = async () => {
      if (!isEmailValid.value) {
        inputEmailError.value = 'Email address must be more than 3 characters and have the @ symbol'
        return
      }

      if (!isPasswordValid.value) {
        inputPasswordError.value = 'Password must be more than 6 characters long'
        return
      }


      try {
        const formLogin = {
          email: email.value,
          password: password.value,
        };

        const { token, user } = await login(formLogin);
        
        localStorage.setItem("token", token);
        localStorage.setItem("id", user.id)
        router.push(`/authorization/profile/${user.id}`);
      } catch (error) {
        console.error(error);
        messageError.value = error
      }
    };

    return { 
      navTop,
      email, 
      password, 
      isEmailValid, 
      isPasswordValid, 
      inputEmailError, 
      inputPasswordError, 
      messageError,
      handlerLogin, 
      bgImage 
    };
  },
};
</script>

<style scoped></style>
