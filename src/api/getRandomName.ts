export const getRandomName = async () => {
  const data = await fetch('https://api.randomdatatools.ru/?unescaped=false&params=FirstName').then(
    (resp) =>
      resp
        .json()
        .then((json) => {
          return json.FirstName.toLowerCase()
        })
        .catch((error) => {
          console.log(error)
          return ''
        })
  )
  return data
}
