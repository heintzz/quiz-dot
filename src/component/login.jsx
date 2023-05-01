import { FcGoogle } from 'react-icons/fc'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthLogin({ handleClick }) {
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

  function handleSubmit(e) {
    e.preventDefault()

    const user_ = { ...user }
    console.log(user_)
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#ACB1D6] font-Montserrat">
      <div className="w-[300px] min-h-[350px] h-fit max-w-[90%] text-justify bg-white p-5 rounded-3xl shadow-[#DBDFEA] shadow-md">
        <h1 className="font-bold">Welcome Back!</h1>
        <p className="text-[.75rem]">Login now to continue</p>
        <div className="flex text-[.85rem] flex-col gap-y-4">
          <form className="mt-5 flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email" className="text-[.9em]">
                Email
              </label>
              <input type="email" id="email" onChange={handleInput} className="block outline-[#ACB1D6]/40 focus:ring-2 outline rounded-sm px-2" placeholder="fulan@gmail.com" />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="password" className="text-[.9em]">
                Password
              </label>
              <input type="password" id="password" onChange={handleInput} className="block outline-[#ACB1D6]/40 focus:ring-2 outline rounded-sm px-2" placeholder="••••••" />
            </div>
            <button type="submit" className="bg-[#ACB1D6] text-white font-semibold rounded-sm px-5 py-1 mx-auto w-full">
              Sign In
            </button>
          </form>
          <p className="w-full text-center flex items-center opacity-50">
            <div className="w-full bg-black h-[1px]"></div>
            <span className="bg-white border-none px-2 min-w-fit text-[.8em]">or login with</span>
            <div className="w-full bg-black h-[1px]"></div>
          </p>
          <button className="flex items-center outline outline-[#ACB1D6]/40 rounded-sm px-2 py-1">
            <FcGoogle className="text-[18px] mr-auto" />
            <p className="mr-auto ml-[-18px] font-semibold" onClick={handleClick}>
              Sign In with Google
            </p>
          </button>
          <p className="text-[.8em] text-center">
            Don&apos;t have account?{' '}
            <Link to="/signup" className="font-semibold cursor-pointer text-[#8294C4]">
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
}
