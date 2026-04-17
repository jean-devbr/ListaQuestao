<script setup lang="ts">
defineProps<{
  message: string;
  loading: boolean;
}>();
</script>

<template>
  <p v-if="message">{{ message }}</p>
  <p v-if="loading">Carregando a pergunta...</p>
</template>

<style scoped>
 p {
   margin: 8px 0;
 }
</style>
