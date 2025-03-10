<template>
  <div class="container">
    <y-choose-icon title="图标选择器" v-model:visible="visible">
      选择图标
    </y-choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean>(false);
</script>

<style scoped></style>
