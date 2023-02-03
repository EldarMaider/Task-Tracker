import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>tasks about</p>
      <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer