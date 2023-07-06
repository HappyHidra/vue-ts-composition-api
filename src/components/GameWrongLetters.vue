<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  wrongLetters: string[]
}

const props = defineProps<Props>()

const notLastLetter = computed(() =>
  [...props.wrongLetters].map((wl, index) =>
    index === props.wrongLetters.length - 1 ? wl : `${wl}, `
  )
)
</script>

<template>
  <div class="wrong-letters-container">
    <div v-if="wrongLetters.length" class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(letter, index) in notLastLetter" :key="letter + index">
        {{ letter }}
      </span>
    </div>
  </div>
</template>
