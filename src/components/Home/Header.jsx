import MenuIcon from '@mui/icons-material/Menu'
import theme from '~/theme'
const Header = () => {

  return (
    <div className={' h-homeHeader'} style={{}}>
      <div className="h-full w-full flex justify-between items-center">
        <img src="/logo.svg" alt="trello logo" className="p-4 text-white"/>
        <MenuIcon sx={{ width:'40px', height:'40px' }}/>
      </div>
    </div>
  )
}

export default Header