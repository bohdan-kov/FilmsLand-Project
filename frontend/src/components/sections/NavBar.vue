<template>
  <div
    class="nav__bar-inner mb-[65px] py-[10px] flex items-center justify-between fixed w-full transition-[top] duration-300 ease-in-out z-[1000] max-w-[1500px] mx-auto left-0 right-0 p-[10px] px-[15px] bg-black/50 backdrop-blur-md rounded-[10px]"
  >
    <img src="@/assets/images/logo.png" alt="Logo" />
    <!-- {{ userStore }} -->
    <nav class="nav__bar-navigation">
      <ul class="nav__bar-list flex gap-[40px]">
        <li class="nav__bar-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav__bar-item">
          <router-link to="/discover-films">Discover Films</router-link>
        </li>
        <li class="nav__bar-item">
          <router-link to="/authorization/login">Latest Films</router-link>
        </li>
        <li class="nav__bar-item">
          <router-link to="/authorization/login">My List</router-link>
        </li>
      </ul>
    </nav>
    <div class="nav__bar-control flex gap-[32px]">
      <img src="@/assets/images/icons/search.svg" alt="search-icon" />
      <router-link class="flex items-center gap-[16px]" to="/authorization/login">
        <div v-if="userStore.name" class="nav__bar-authorized italic">
          Hi, {{ userStore.name }}
        </div>
        <div v-if="userStore.avatarUrl" class="nav__bar-authorized relative">
          <img
            :src="userStore.avatarUrl"
            alt="Avatar"
            class="rounded-full w-[38px] h-[38px] object-cover shadow-2xl"
          />
          <div
            class="profile__icon-inner w-[16px] h-[16px] bg-white/30 rounded-full absolute left-[-5px] bottom-0 shadow-2xl"
          >
            <svg
              class="cursor-pointer"
              @click="logout"
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9908 7.82251C16.2897 7.5357 16.7644 7.54547 17.0512 7.84433L20.541 11.4807C20.8195 11.7709 20.8195 12.2291 20.541 12.5193L17.0512 16.1557C16.7644 16.4545 16.2897 16.4643 15.9908 16.1775C15.692 15.8907 15.6822 15.4159 15.969 15.1171L18.2404 12.7502L11.2727 12.7502C10.8585 12.7502 10.5227 12.4144 10.5227 12.0002C10.5227 11.586 10.8585 11.2502 11.2727 11.2502L18.2408 11.2502L15.969 8.88295C15.6822 8.58409 15.692 8.10932 15.9908 7.82251Z"
                  fill="#000000"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H13.4545C13.8688 3.25 14.2045 3.58579 14.2045 4V7C14.2045 7.41421 13.8688 7.75 13.4545 7.75C13.0403 7.75 12.7045 7.41421 12.7045 7V4.75H4.75V19.25H12.7045V17C12.7045 16.5858 13.0403 16.25 13.4545 16.25C13.8688 16.25 14.2045 16.5858 14.2045 17V20C14.2045 20.4142 13.8688 20.75 13.4545 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div v-else class="bg-white/30 rounded-full">
          <svg
            class="p-[4px] rounded-full shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
            width="38px"
            height="38px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 11.796C14.7189 11.796 16.9231 9.60308 16.9231 6.89801C16.9231 4.19294 14.7189 2.00005 12 2.00005C9.28106 2.00005 7.07692 4.19294 7.07692 6.89801C7.07692 9.60308 9.28106 11.796 12 11.796Z"
                fill="#000000"
              />
              <path
                d="M14.5641 13.8369H9.4359C6.46154 13.8369 4 16.2859 4 19.245C4 19.9593 4.30769 20.5716 4.92308 20.8777C5.84615 21.3879 7.89744 22.0001 12 22.0001C16.1026 22.0001 18.1538 21.3879 19.0769 20.8777C19.5897 20.5716 20 19.9593 20 19.245C20 16.1838 17.5385 13.8369 14.5641 13.8369Z"
                fill="#000000"
              />
            </g>
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  userStore.resetUser();
};
</script>

<style lang="scss" scoped></style>
