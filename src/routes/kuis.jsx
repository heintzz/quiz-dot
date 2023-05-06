import axios from 'axios'
import parse from 'html-react-parser'
import { useState } from 'react'
import { useEffect } from 'react'
import Timer from '../component/timer'
import Statistik from '../component/statistik'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
  const navigate = useNavigate()
  const [end, setEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    const isEnd = localStorage.getItem('end') || false
    const token = Cookies.get('token')
    if (!token) navigate('/')
    setEnd(isEnd)
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
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
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
