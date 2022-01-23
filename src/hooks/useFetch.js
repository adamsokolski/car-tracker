import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(url)
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then(
        (result) => {
          setData(result.objects)
          setIsLoaded(true)
          setError(null)
          console.log(result.objects)
        },

        (error) => {
          setIsLoaded(true)
          setError(error)
          console.error(error)
        }
      )
  }, [url])
  return { data, isLoaded, error }
}

export default useFetch
