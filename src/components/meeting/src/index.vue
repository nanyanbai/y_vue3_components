<template>
  <div>
    <Ready v-if="actCard === 'Ready'" />
    <Main v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Ready from "./Ready/index.vue";
import Main from "./Main/index.vue";

const actCard = ref("Main");
</script>

<style scoped></style>
