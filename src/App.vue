<script setup lang="ts">
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from '@/composables/useRandomWord'
import { useLetters } from '@/composables/useLetters'
import { useNotification } from '@/composables/useNotification'

const { word, getWord } = useRandomWord()
const {
  letters,
  correctLetters,
  wrongLetters,
  userLose,
  userWin,
  wrongLettersCounter,
  addLetter,
  resetLetters
} = useLetters(word)

const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof GamePopup> | null>(null)

watch(wrongLetters, () => {
  if (userLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (userWin.value) {
    popup.value?.open('win')
  }
})

const restart = async () => {
  await getWord()
  resetLetters()
  popup.value?.close()
}

window.addEventListener('keydown', ({ key }) => {
  if (userLose.value || userWin.value) {
    return
  }
  if (letters.value.includes(key)) {
    showNotification()
    return
  }
  addLetter(key)
})
</script>

<template>
  <div id="app">
    <GameHeader />
    <!-- Game container -->
    <div class="game-container">
      <GameFigure :wrong-letter-counter="wrongLettersCounter" />
      <GameWrongLetters :wrong-letters="wrongLetters" />
      <GameWord :word="word" :correct-letters="correctLetters" />
    </div>
    <!-- Container for final message -->
    <GamePopup ref="popup" :word="word" @restart="restart" />
    <!-- Notification -->
    <GameNotification ref="notification" />
  </div>
</template>
