import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const rules = [
  'Soal yang diberikan bertipe benar salah',
  'Tidak terdapat pengurangan poin apabila menjawab dengan salah',
  'Jumlah soal yang disediakan setiap percobaan adalah 25 soal',
  'Peserta tidak dapat mengubah jawaban',
  'Peserta tidak dapat kembali ke nomor sebelumnya maupun nomor tertentu sehingga peserta diharapkan untuk memastikan jawabannya terlebih dahulu',
  'Waktu pengerjaan selama 5 menit dan akan dimulai ketika memencet tombol lanjut',
]

export default function Dashboard({ setValue }) {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)

  function logout() {
    setValue('')
    Cookies.remove('token')
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#4BA930]">
      <div className="w-[90%] max-w-[350px] min-h-[373px] font-Montserrat flex flex-col gap-y-5 p-4 rounded-3xl bg-white shadow-[#9CCE8E] shadow-md">
        <h1 className="text-[1.5em] font-bold text-center">Aturan Pengerjaan Kuis</h1>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ol class="list-dist text-[.85em]">
          {rules.map((rule, i) => (
            <li key={i}>
              {i + 1}. {rule}
            </li>
          ))}
        </ol>
        <label htmlFor="aggree" className="flex items-center gap-x-1 text-[.6em] md:text-[.7em]">
          <input type="checkbox" name="aggree" id="aggree" onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
          Saya sudah membaca peraturan dan siap untuk mengerjakan kuis
        </label>
        <button className="bg-[#FFCD00] font-semibold px-2 py-1 rounded-md" disabled={!isChecked} onClick={() => navigate('/quiz')}>
          Lanjut
        </button>
        <button className="bg-[#ff0000] mt-[-8px] font-semibold px-2 py-1 rounded-md text-white" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  setValue: PropTypes.func,
}
