import axios from 'axios'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useEffect } from 'react'
import Timer from '../component/timer'
import Statistik from '../component/statistik'

let benar = 0
let salah = 0
let jumlahJawab = 0
let jumlahSoal
let nilai

export default function Quiz() {
  const [end, setEnd] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setEnd(localStorage.getItem('end') || false)
    const lastIndex = parseInt(localStorage.getItem('lastIndex'))
    if (lastIndex === 0) {
      // do nothing :)
    } else if (!lastIndex) localStorage.setItem('lastIndex', 0)
    else setActiveIndex(lastIndex)

    const existedQ = JSON.parse(localStorage.getItem('questionSet'))
    async function getQuestionSet() {
      try {
        const res = await axios.get('https://opentdb.com/api.php?amount=25&difficulty=medium&type=boolean')
        const data = res.data.results
        localStorage.setItem('questionSet', JSON.stringify(data))
        setQuestions(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
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
    const correctAnswerSet = questions.map((q) => q.correct_answer)
    const userAnswer = JSON.parse(localStorage.getItem('answer'))

    if (userAnswer?.length > 0) {
      userAnswer.forEach((ans, i) => {
        if (ans === correctAnswerSet[i]) {
          benar += 1
        }
      })
    }

    jumlahSoal = correctAnswerSet.length
    jumlahJawab = userAnswer?.length || 0
    salah = jumlahJawab - benar

    nilai = (benar / jumlahSoal) * 100
    nilai = Math.round(nilai)
    // ready to infer the statistics
    setReady(true)
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
      {end && ready && <Statistik statistik={{ benar, salah, jumlahJawab, jumlahSoal, nilai }} />}
    </div>
  )
}
