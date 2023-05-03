import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Statistik({ statistik }) {
  const navigate = useNavigate()
  const { benar, salah, jumlahJawab, jumlahSoal, nilai } = statistik
  const kosong = jumlahSoal - jumlahJawab

  const config = {
    labels: [`Benar: ${benar}`, `Salah: ${salah}`, `Kosong: ${kosong}`],
    datasets: [
      {
        data: [benar, salah, kosong],
        backgroundColor: ['rgba(71, 179, 156)', 'rgb(236, 107, 86)', 'rgba(255, 193, 84)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="absolute top-0 bottom-0 w-screen h-screen flex justify-center items-center ">
      <div className="relative w-[300px] flex flex-col justify-between min-h-[373px] h-fit max-w-[90%] text-justify bg-white p-5 rounded-3xl shadow-[#9CCE8E] shadow-md">
        <div>
          <h1 className="text-[1.25em] font-bold">Hasil Kuis</h1>
          <Pie data={config} className="w-[90%] my-3" />
        </div>
        <p className="text-[.8em]">
          Anda menjawab <b>{jumlahJawab}</b> dari <b>{jumlahSoal} soal</b>
        </p>
        <div className="flex justify-between items-end mt-1">
          <div className="font-bold">
            <p>NILAI AKHIR</p>
            <p>
              <span>
                <b>{nilai}</b>
              </span>
            </p>
          </div>
          <button
            className="bg-[#FFCD00] px-3 py-1 rounded-md text-black font-semibold"
            onClick={() => {
              navigate('/')
              localStorage.clear()
            }}
          >
            kembali
          </button>
        </div>
      </div>
    </div>
  )
}

Statistik.propTypes = {
  statistik: PropTypes.object,
}
