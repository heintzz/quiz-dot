import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../config/api'

export default function AuthSignup() {
  const [errMsg, setErrMsg] = useState('')
  const [err, setErr] = useState(false)
  const [user, setUser] = useState({})

  function handleInput(e) {
    const type = e.target.id
    const value = e.target.value

    if (type === 'username' && value.length > 15) {
      displayError('maximum username char is 15.')
    } else {
      setUser((prev) => {
        return {
          ...prev,
          [type]: value,
        }
      })
    }
  }

  function displayError(msg) {
    setErr(true)
    setTimeout(() => {
      setErr(false)
    }, 2000)
    setErrMsg(msg)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const user_ = { ...user }

    if (user_.email && user_.password && user_.username) {
      const { success, msg } = await signUp(user_)
      if (success) {
        form.reset()
        setUser({})
      } else {
        displayError(msg)
      }
    } else {
      displayError('please complete the form')
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#4BA930] font-Montserrat">
      <div className="w-[300px] min-h-[373px] h-fit max-w-[90%] text-justify bg-white p-5 rounded-3xl shadow-[#9CCE8E] shadow-md">
        <h1 className="font-bold">Hello!</h1>
        <p className="text-[.75rem]">We are pleased to know you</p>
        <div className="flex text-[.85rem] flex-col gap-y-4">
          <form className="mt-5 flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="username" className="text-[.9em]">
                Username
              </label>
              <input
                value={user.username}
                type="text"
                id="username"
                onChange={handleInput}
                className="block outline-[#7FC06C]/40 focus:ring-2 focus:ring-[#7FC06C] outline rounded-md px-2 py-1"
                placeholder="dot.indonesia"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email" className="text-[.9em]">
                Email
              </label>
              <input
                value={user.email}
                type="email"
                id="email"
                onChange={handleInput}
                className="block outline-[#7FC06C]/40 focus:ring-2 focus:ring-[#7FC06C] outline rounded-md px-2 py-1"
                placeholder="hasnan@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="password" className="text-[.9em]">
                Password
              </label>
              <input
                value={user.password}
                type="password"
                id="password"
                onChange={handleInput}
                className="block outline-[#7FC06C]/40 focus:ring-2 focus:ring-[#7FC06C] outline rounded-md px-2 py-1"
                placeholder="••••••"
              />
            </div>
            <button type="submit" className="bg-[#FFCD00]  font-semibold rounded-md px-5 py-1 mx-auto w-full">
              Sign Up
            </button>
          </form>
          <span className={`text-red-500 font-semibold text-[.65rem] mt-[-8px] ${!err && 'hidden'}`}>** {errMsg}</span>
          <p className="text-[.8em] text-center">
            Already have account?{' '}
            <Link to="/" className="font-semibold cursor-pointer text-[#4BA930] mt-[-8px]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
