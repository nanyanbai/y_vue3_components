<template>
  <div class="container">
    <button @click="count++">count++</button>
    <y-context-menu :count="count"> </y-context-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(6);
</script>

<style lang="scss" scoped></style>
