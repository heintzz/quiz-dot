import { useEffect, useState } from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Quiz from './kuis'
import Cookies from 'js-cookie'
import AuthLogin from '../component/login'

export default function Login() {
  const [value, setValue] = useState('')

  function handleClick(e) {
    e.preventDefault()
    signInWithPopup(auth, provider).then((data) => {
      const user = data.user
      const token = user.accessToken
      setValue(token)
      Cookies.set('token', token, { expires: 1 })
    })
  }

  useEffect(() => {
    setValue(Cookies.get('token'))
  }, [])

  return <>{value ? <Quiz setValue={setValue} /> : <AuthLogin handleClick={handleClick} />}</>
}
