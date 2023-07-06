import { ref, computed } from 'vue'
import { type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() =>
    letters.value.filter((letter) => word.value.includes(letter))
  )
  const wrongLetters = computed(() =>
    letters.value.filter((letter) => !word.value.includes(letter))
  )

  const userWin = computed(() =>
    [...word.value].every((letter) => correctLetters.value.includes(letter))
  )
  const userLose = computed(() => wrongLetters.value.length === 6)

  const wrongLettersCounter = computed(() => wrongLetters.value.length)

  const addLetter = (key: string) => {
    if (key.match(/[а-яА-ЯёЁ]/)) {
      letters.value.push(key.toLowerCase())
    }
  }

  const resetLetters = () => {
    letters.value = []
  }

  return {
    letters,
    correctLetters,
    wrongLetters,
    userLose,
    userWin,
    wrongLettersCounter,
    addLetter,
    resetLetters
  }
}
