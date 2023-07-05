<script setup lang="ts">
// const props = defineProps(['word'])
interface Props {
  word: string
  correctLetters: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" class="letter" :key="index">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>
