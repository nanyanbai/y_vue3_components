<template>
  <div class="container">
    <y-choose-area  @change="changeArea"></y-choose-area>
  </div>
</template>

<script setup lang="ts">


const  changeArea = (val: any) => { 
  console.log('选择的值',  val)
}

</script>

<style scoped></style>
