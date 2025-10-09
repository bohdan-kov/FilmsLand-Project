<template>
  <div class="profile__view-inner relative">
    <div
      class="profile__details-background h-[100vh] bg-cover bg-center bg-no-repeat filter blur-[10px]"
      :style="{
        backgroundImage: `url(${bgImage})`,
      }"
    ></div>
    <div class="profile__view-wrapper pt-[60px]">
      <div class="page__container">
        <div
          class="profile__view-box absolute flex flex-col items-center gap-[40px] max-w-[1500px] top-0 pt-[100px] left-0 right-0 mx-auto px-[15px] text-center"
        >
          <div class="profile__view-avatar bg-white/30 rounded-full relative">
            <img
              v-if="userStore.avatarUrl"
              :src="userStore.avatarUrl"
              alt="Avatar"
              class="rounded-full w-[200px] h-[200px] object-cover shadow-2xl"
            />
            <svg
              v-else
              class="pb-[15px] rounded-full shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
              width="200px"
              height="200px"
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
            <!-- absolute bg-transparent text-transparent left-0 right-0 mx-auto -->
            <div
              class="profile__icon-inner w-[33px] h-[33px] p-[5px] bg-white/30 rounded-full absolute left-[10px] bottom-0 shadow-2xl"
            >
              <label>
                <svg
                  class="w-[24px] cursor-pointer"
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
                      d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
                <input type="file" class="hidden" @change="handleFileInput" />
              </label>
            </div>
            <div
              class="profile__icon-inner w-[33px] h-[33px] p-[4px] bg-white/30 rounded-full absolute right-[10px] bottom-0 shadow-2xl"
            >
              <svg
                @click="logout"
                class="cursor-pointer"
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
          <div class="profile__view-desc w-full">
            <h3 class="profile__view-title font-contrast text-4xl font-normal inline">
              Hi, {{ userStore.name }}
            </h3>
            <div class="profile__view-header flex items-center gap-[10px]"></div>
          </div>
        </div>
        <home-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { uploadPhoto } from "@/services/authService";


import HomeFooter from "@/components/sections/HomeFooter.vue";
import bgImage from "@/assets/images/authorization-bg.jpg";

export default {
  components: { HomeFooter },
  setup() {
    const router = useRouter();

    const selectedFile = ref(null);
    const userStore = useUserStore();



    const uploadSelectedPhoto = async () => {
      if (!selectedFile.value) return;

      try {
        const token = localStorage.getItem("token");
        await uploadPhoto(selectedFile.value, token);
        router.go(0)
      } catch (error) {
        console.error("Помилка при завантаженні фото:", error);
      }
    };

    const handleFileInput = (e) => {
      selectedFile.value = e.target.files[0];
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      router.push("/authorization/login");
      userStore.resetUser()
    };

    
    watch(
      selectedFile,
      (file) => {
        if (file) uploadSelectedPhoto();
      }
    );

    onMounted(async () => {
      await userStore.fetchUser();
    });


    return {
      bgImage,
      selectedFile,
      userStore,
      handleFileInput,
      logout,
    };
  },
};
</script>
<style scoped></style>
