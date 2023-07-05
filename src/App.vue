<script setup lang="ts">
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'

const word = ref('')

const getWord = () =>
  fetch('https://api.randomdatatools.ru/?unescaped=false&params=FirstName').then((resp) =>
    resp
      .json()
      .then((json) => {
        word.value = json.FirstName.toLowerCase()
        console.log(word.value)
      })
      .catch((error) => {
        word.value = ''
        console.log(error)
      })
  )
getWord()

const letters = ref<string[]>([])
const correctLetters = computed(() => letters.value.filter((letter) => word.value.includes(letter)))
const wrongLetters = computed(() => letters.value.filter((letter) => !word.value.includes(letter)))
const wrongLettersCounter = computed(() => wrongLetters.value.length)
const userWin = computed(() =>
  [...word.value].every((letter) => correctLetters.value.includes(letter))
)
const userLose = computed(() => wrongLetters.value.length === 6)
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
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
  letters.value = []
  popup.value?.close()
}

window.addEventListener('keydown', ({ key }) => {
  if (userLose.value || userWin.value) {
    return
  }
  if (letters.value.includes(key)) {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
    return
  }
  if (key.match(/[а-яА-ЯёЁ]/)) {
    letters.value.push(key.toLowerCase())
  }
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
