<template>
  
  <div>得到传入的： {{ count }}</div>
  <div>double： {{ doubleCount }}</div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  count: Number,
});

const doubleCount = ref(props.count * 2);
</script>
