import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Dashboard({ setValue }) {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#4BA930]">
      <div className="max-w-[90%] min-h-[373px] font-Montserrat flex flex-col gap-y-5 p-4 rounded-md bg-[#9CCE8E]">
        <h1 className="text-[1.5em] font-bold text-center">Aturan Pengerjaan Kuis</h1>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ol class="list-dist">
          <li>1. Soal yang diberikan bertipe benar salah</li>
          <li>2. Tidak terdapat pengurangan poin apabila menjawab dengan salah</li>
          <li>3. Jumlah soal yang disediakan setiap percobaan adalah 25 soal</li>
          <li>4. Peserta tidak dapat mengubah jawaban</li>
          <li>5. Peserta tidak dapat kembali ke nomor sebelumnya maupun nomor tertentu sehingga peserta diharapkan untuk memastikan jawabannya terlebih dahulu</li>
          <li>6. Waktu pengerjaan selama 5 menit dan akan dimulai ketika memencet tombol lanjut</li>
        </ol>
        <label htmlFor="aggree" className="flex items-center gap-x-1 text-[.6em] md:text-[.8em]">
          <input type="checkbox" name="aggree" id="aggree" onChange={() => setIsChecked((prev) => !prev)} checked={isChecked} />
          Saya sudah membaca peraturan dan siap untuk mengerjakan kuis
        </label>
        <button className="bg-[#FFCD00] font-semibold px-2 py-1 rounded-md" disabled={!isChecked} onClick={() => navigate('/quiz')}>
          Lanjut
        </button>
        <button
          className="bg-[#ff0000] font-semibold px-2 py-1 rounded-md text-white"
          onClick={() => {
            setValue('')
            Cookies.remove('token')
            localStorage.clear()
            navigate('/')
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  setValue: PropTypes.func,
}
