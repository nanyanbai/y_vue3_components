<template>
  <div v-if="!disabled" class="btn-item" @click="close">
    <!-- <img src="@/assets/svg/micro-off.svg" /> -->

    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
    >
      <path
        d="M816 496v144c0 2.8-0.4 5.6-1.1 8.4-18.5 68.2-58.9 126.1-112.3 166.9-43.5 33.2-95.6 55.2-151.6 62.2-4 0.5-7 3.9-7 7.9V944c0 8.8 7.2 16 16 16h80c35.3 0 64 28.7 64 64H320c0-35.3 28.7-64 64-64h80c8.8 0 16-7.2 16-16v-58.5c0-4-3-7.4-7-7.9-124.8-15.7-230.3-105.5-263.9-229.2-0.7-2.7-1.1-5.6-1.1-8.4V496.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32v129.8c0 6.9 1.1 13.8 3.3 20.3C309.3 746.9 404.6 816 512 816s202.7-69.1 236.7-169.9c2.2-6.5 3.3-13.4 3.3-20.3V496.7c0-17.4 13.7-32.2 31.1-32.7 18.1-0.5 32.9 14 32.9 32z"
        fill="#fff"
      ></path>
    </svg>

    <div class="box">
      <div class="value" :style="{ transform: transformValue }"></div>
    </div>
  </div>
  <div v-else class="btn-item" @click="open">
    <img src="@/assets/svg/micro-close.svg" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["close", "open"]);

const transformValue = computed(() => {
  return `translateY(${16 - props.volume * 0.01}px)`;
});

const close = () => {
  emit("close");
};

const open = () => {
  emit("open");
};
</script>

<style lang="scss" scoped>
.btn-item {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.23);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  img {
    width: 30px;
    height: 30px;
  }
}

svg {
  width: 26px;
  height: 26px;
}

.box {
  width: 8px;
  height: 16px;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  top: 14px;
  overflow: hidden;

  .value {
    width: 10px;
    height: 30px;
    background-color: #00ff00;
    position: absolute;
    // top: 16px;
    left: 0;
    z-index: 10;
    // 0 - 16px
    transform: translateY(16px);
  }
}
</style>
