import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Timer({ setEnd }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const now = Date.now()
    const endTime = localStorage.getItem('ET') || now + 1000 * 10
    const remaining = endTime - now
    setTimeLeft(remaining)
    localStorage.setItem('ET', endTime)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1000
        } else {
          setEnd(true)
          localStorage.setItem('end', true)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return (
    <div>
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

Timer.propTypes = {
  setEnd: PropTypes.func.isRequired,
}
