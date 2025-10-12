<template>
  <button
    class="h-[30px] w-[30px] flex rounded-full justify-center items-center relative"
  >
    <transition name="heart-bounce" mode="out-in">
      <svg
        v-if="isFavorite"
        key="filled"
        class="absolute inset-0 m-auto scale-110 animate-pop"
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <path
          d="M12.7692 6.70483C9.53846 2.01902 4 3.90245 4 8.68256C4 13.4627 13.2308 20 13.2308 20C13.2308 20 22 13.2003 22 8.68256C22 4.16479 16.9231 2.01903 13.6923 6.70483L13.2308 7.0791L12.7692 6.70483Z"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else
        key="empty"
        class="absolute inset-0 m-auto transition-all duration-300 ease-in-out"
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="transparent"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <path
          d="M12.7692 6.70483C9.53846 2.01902 4 3.90245 4 8.68256C4 13.4627 13.2308 20 13.2308 20C13.2308 20 22 13.2003 22 8.68256C22 4.16479 16.9231 2.01903 13.6923 6.70483L13.2308 7.0791L12.7692 6.70483Z"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </transition>
  </button>
</template>

<script>
export default {
  props: {
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop {
  animation: pop 0.2s ease-out;
}

.heart-bounce-enter-active,
.heart-bounce-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.heart-bounce-enter-from,
.heart-bounce-leave-to {
  transform: scale(0.6);
  opacity: 0;
}
.heart-bounce-enter-to,
.heart-bounce-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
