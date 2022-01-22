import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.objects)
          setIsLoaded(true)
          setError(null)
        },

        (error) => {
          setIsLoaded(true)
          setError(error.message)
        }
      )
  }, [url])
  return { data, isLoaded, error }
}

export default useFetch
