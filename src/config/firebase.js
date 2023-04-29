import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'quiz-dot.firebaseapp.com',
  projectId: 'quiz-dot',
  storageBucket: 'quiz-dot.appspot.com',
  messagingSenderId: '81305865636',
  appId: '1:81305865636:web:c83ebba283fc241d11c531',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }
