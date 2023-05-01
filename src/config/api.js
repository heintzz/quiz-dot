import { auth } from './firebase'

import { createUserWithEmailAndPassword } from 'firebase/auth'

export async function signUp(user) {
  const { email, password } = user
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const response = { success: true, msg: `user with email: ${user.email} created` }
    return response
  } catch (error) {
    const errorMessage = error.code
    const response = { success: false, msg: errorMessage }
    return response
  }
}
