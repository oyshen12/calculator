<template>
  <v-btn @click="$emit('click')" icon fab x-large color="white"
    ><span class="btn-text"><slot></slot></span
  ></v-btn>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-text {
  font-size: 48px;
}
</style>
