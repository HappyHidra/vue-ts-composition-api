<script setup lang="ts">
interface Props {
  wrongLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="wrong-letters-container">
    <div v-if="wrongLetters.length" class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(wl, index) of wrongLetters" :key="index">{{
        index === wrongLetters.length - 1 ? wl : `${wl}, `
      }}</span>
    </div>
  </div>
</template>
