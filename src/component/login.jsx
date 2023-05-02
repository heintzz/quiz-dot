import { FcGoogle } from 'react-icons/fc'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signIn } from '../config/api'
import Cookies from 'js-cookie'

export default function AuthLogin({ handleClick, setValue }) {
  const [errMsg, setErrMsg] = useState('')
  const [err, setErr] = useState(false)
  const [user, setUser] = useState({})

  function handleInput(e) {
    const type = e.target.id
    const value = e.target.value

    setUser((prev) => {
      return {
        ...prev,
        [type]: value,
      }
    })
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

    if (user_.email && user_.password) {
      const res = await signIn(user_)
      if (res.success) {
        const token = res.token
        form.reset()
        setValue(token)
        Cookies.set('token', token, { expires: 1 })
        setUser({})
      } else {
        displayError(res.msg)
      }
    } else {
      displayError('please complete the form')
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#4BA930] font-Montserrat">
      <div className="w-[300px] min-h-[373px] h-fit max-w-[90%] text-justify bg-white p-5 rounded-3xl shadow-[#DBDFEA] shadow-md">
        <h1 className="font-bold">Welcome Back!</h1>
        <p className="text-[.75rem]">Login now to continue</p>
        <div className="flex text-[.85rem] flex-col gap-y-4">
          <form className="mt-5 flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email" className="text-[.9em]">
                Email
              </label>
              <input
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
              <input type="password" id="password" onChange={handleInput} className="block outline-[#7FC06C]/40 focus:ring-2 focus:ring-[#7FC06C] outline rounded-md px-2 py-1" placeholder="••••••" />
            </div>
            <span className={`text-red-500 font-semibold text-[.65rem] mt-[-8px] ${!err && 'hidden'}`}>{errMsg}</span>
            <button type="submit" className="bg-[#FFCD00] font-semibold rounded-md px-5 py-1 mx-auto w-full">
              Sign In
            </button>
          </form>
          <p className="w-full text-center flex items-center opacity-50">
            <span className="w-full bg-[#9CCE8E] h-[1px]"></span>
            <span className="bg-white border-none px-2 min-w-fit text-[.8em]">or login with</span>
            <span className="w-full bg-[#9CCE8E] h-[1px]"></span>
          </p>
          <button className="flex items-center outline outline-[#7FC06C]/40 rounded-md px-2 py-1">
            <FcGoogle className="text-[18px] mr-auto" />
            <p className="mr-auto ml-[-18px] font-semibold" onClick={handleClick}>
              Sign In with Google
            </p>
          </button>
          <p className="text-[.8em] text-center">
            Don&apos;t have account?{' '}
            <Link to="/signup" className="font-semibold cursor-pointer text-[#4BA930]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

AuthLogin.propTypes = {
  handleClick: PropTypes.func,
  setValue: PropTypes.func,
}
