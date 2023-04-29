import { useEffect, useState } from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Quiz from './kuis'
import Cookies from 'js-cookie'

export default function Login() {
  const [value, setValue] = useState('')

  function handleClick() {
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

  return <>{value ? <Quiz setValue={setValue} /> : <button onClick={handleClick}>Sign in with Google</button>}</>
}
