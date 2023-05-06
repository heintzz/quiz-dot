import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Timer({ setEnd }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const now = Date.now()
    // set the quiz time last for 5 minutes
    const endTime = localStorage.getItem('ET') || now + 1000 * 60 * 5
    localStorage.setItem('ET', endTime)

    const remaining = endTime - now
    if (remaining < 0) setTimeLeft(0)
    else setTimeLeft(remaining)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1000) {
          return prev - 1000
        } else {
          setEnd(true)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((timeLeft / 1000) % 60)

  return (
    <div className="bg-black text-[#FFCD00] font-semibold px-2 rounded-lg">
      <span>
        <span>{minutes.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
      </span>
    </div>
  )
}

Timer.propTypes = {
  setEnd: PropTypes.func.isRequired,
  koreksi: PropTypes.func.isRequired,
}
