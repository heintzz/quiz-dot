import { auth } from './firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export async function signUp(user) {
  const { email, password } = user
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const response = { success: true, msg: `user with email: ${user.email} created` }
    return response
  } catch (error) {
    let errorMessage = error.code
    errorMessage = errorMessage.substring('auth/'.length, errorMessage.length).split('-').join(' ')
    const response = { success: false, msg: errorMessage }
    return response
  }
}

export async function signIn(user) {
  const { email, password } = user
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const response = { success: true, msg: `user with email: ${user.email} has logged in`, token: user.accessToken }
    return response
  } catch (error) {
    let errorMessage = error.code
    errorMessage = errorMessage.substring('auth/'.length, errorMessage.length).split('-').join(' ')
    const response = { success: false, msg: errorMessage }
    return response
  }
}
