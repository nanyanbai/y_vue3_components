<template>
  <div class="btn-item" @click="open">
    <img src="@/assets/svg/screen.svg" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "open"]);

const close = () => {
  emit("close");
};

const open = () => {
  emit("open");
};
</script>

<style lang="scss" scoped>
.btn-item {
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
    width: 90%;
    height: 90%;
  }
}
</style>
