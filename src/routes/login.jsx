import { useEffect, useState } from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'js-cookie'
import AuthLogin from '../component/login'
import Home from './home'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
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
    if (localStorage.getItem('start')) {
      navigate('/quiz')
    }
  }, [])

  return <>{value ? <Home setValue={setValue} /> : <AuthLogin handleClick={handleClick} setValue={setValue} />}</>
}
