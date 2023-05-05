import axios from 'axios'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useEffect } from 'react'
import Timer from '../component/timer'
import Statistik from '../component/statistik'

export default function Quiz() {
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    setEnd(localStorage.getItem('end') || false)
    const lastIndex = parseInt(localStorage.getItem('lastIndex'))

    if (isNaN(lastIndex)) localStorage.setItem('lastIndex', 0)
    else setActiveIndex(lastIndex)

    const existedQ = JSON.parse(localStorage.getItem('questionSet'))
    async function getQuestionSet() {
      try {
        const res = await axios.get('https://opentdb.com/api.php?amount=25&category=9&difficulty=medium&type=boolean')
        const data = res.data.results
        localStorage.setItem('questionSet', JSON.stringify(data))
        setQuestions(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    if (!existedQ) {
      getQuestionSet()
    } else {
      setQuestions(existedQ)
      setLoading(false)
    }
  }, [])

  function clickEvent(e) {
    const text = e.target.textContent
    const answerrr = JSON.parse(localStorage.getItem('answer')) || []

    if (activeIndex === questions.length - 1 && !end) {
      setActiveIndex((prev) => prev)
      answerrr.push(text)
      setEnd(true)
      localStorage.setItem('end', true)
      localStorage.setItem('lastIndex', questions.length - 1)
    }

    if (activeIndex < questions.length && activeIndex !== questions.length - 1) {
      setActiveIndex((prev) => prev + 1)
      answerrr.push(text)
      localStorage.setItem('lastIndex', activeIndex + 1)
    }

    localStorage.setItem('answer', JSON.stringify(answerrr))
  }

  function koreksiJawaban() {
    let benar = 0
    let salah = 0

    const correctAnswerSet = questions.map((q) => q.correct_answer)
    const userAnswer = JSON.parse(localStorage.getItem('answer'))

    if (userAnswer?.length > 0) {
      userAnswer.forEach((ans, i) => {
        if (ans === correctAnswerSet[i]) {
          benar += 1
        }
      })
    }

    const jumlahSoal = correctAnswerSet.length
    const jumlahJawab = userAnswer?.length || 0

    salah = jumlahJawab - benar

    let nilai = (benar / jumlahSoal) * 100
    nilai = Math.round(nilai)

    const userStat = { benar, salah, jumlahJawab, jumlahSoal, nilai }

    // ready to infer the statistics
    setStatistics((prev) => {
      return { ...prev, ...userStat }
    })
  }

  useEffect(() => {
    if (end) {
      koreksiJawaban()
    }
  }, [end])

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#4BA930] font-Montserrat">
      <div className="flex flex-col justify-between w-[300px] min-h-[350px] h-fit max-w-[90%] text-justify bg-white p-5 rounded-3xl shadow-[#9CCE8E] shadow-md">
        {loading ? (
          <p>retrieving questions....</p>
        ) : (
          <>
            <div className="flex flex-col gap-y-6">
              <div className="flex justify-between items-start">
                <p className="bg-[#9CCE8E] font-semibold w-12 aspect-square rounded-full flex justify-center items-center">{activeIndex + 1}</p>
                <Timer setEnd={setEnd} />
              </div>
              {parse(`<p className="text-[.95rem]">${questions[activeIndex]?.question}</p>`)}
            </div>
            <div className="flex justify-evenly font-semibold text-white">
              <button className="px-3 py-1 rounded-md bg-red-500" onClick={clickEvent}>
                False
              </button>
              <button className="px-3 py-1 rounded-md bg-green-500" onClick={clickEvent}>
                True
              </button>
            </div>
          </>
        )}
      </div>
      {end && statistics.jumlahSoal && <Statistik statistik={statistics} />}
    </div>
  )
}
