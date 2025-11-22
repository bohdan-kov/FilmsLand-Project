<template>
  <div class="sort-dropdown__inner">
    <div
      @click="isOpenFilter = !isOpenFilter"
      class="sort-dropdown__btn px-[16px] py-[14px] items-center rounded-[15px] bg-[#12192C] flex justify-between w-full"
      :class="{ '!rounded-b-[0]': isOpenFilter }"
    >
      <p class="sort-dropdown__name">Sorting</p>
      <img
        :class="{ 'rotate-[90deg]': isOpenFilter }"
        src="@/assets/images/icons/arrow-right.svg"
        alt=""
      />
    </div>
    <div
      v-show="isOpenFilter"
      class="sort-dropdown__filter px-[16px] py-[14px] rounded-b-[15px] bg-[#1C2331]"
    >
      <select
        class="bg-black/30 text-white px-3 py-2 rounded-md border-none w-full appearance-none"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option value="original_title.asc">Title (A-Z)</option>
        <option value="original_title.desc">Title (Z-A)</option>
        <option value="popularity.asc">Popularity (Low to High)</option>
        <option value="popularity.desc">Popularity (High to Low)</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpenFilter: false,
    };
  },
  props: {
    modelValue: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
