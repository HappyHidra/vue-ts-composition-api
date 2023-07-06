<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  word: string
  correctLetters: string[]
}

const props = defineProps<Props>()
const guessedLetters = computed(() =>
  [...props.word].map((letter) => (props.correctLetters.includes(letter) ? letter : ''))
)
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in guessedLetters" class="letter" :key="letter + index">
      {{ letter }}
    </span>
  </div>
</template>
