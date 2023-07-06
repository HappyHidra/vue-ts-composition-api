import { getRandomName } from '@/api/getRandomName'
import { onMounted, ref } from 'vue'

export const useRandomWord = () => {
  const word = ref('')

  const getWord = async () => {
    word.value = await getRandomName()
  }

  onMounted(() => {
    getWord()
  })

  return { word, getWord }
}
