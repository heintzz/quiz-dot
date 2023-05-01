import Dashboard from '../component/dashboard'
import PropTypes from 'prop-types'

export default function Home({ setValue }) {
  return <Dashboard setValue={setValue} />
}

Home.propTypes = {
  setValue: PropTypes.func,
}
