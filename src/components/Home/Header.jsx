import MenuIcon from '@mui/icons-material/Menu'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Header = () => {

  return (
    <div className={' h-homeHeader bg-white'} style={{}}>
      <div className="h-full w-full flex justify-between items-center">
        <img src="/logo.svg" alt="trello logo" className="p-4 text-white"/>

        <div className='cursor-pointer md:hidden xl:hidden'>

          <MenuIcon sx={{ width:'40px', height:'40px', color:'black' }} />

        </div>

      </div>
      <div className='bg-white w-full text-[#172b4d] text-xl'>
        <div className='px-4 pb-4'>
          <ul>
            <li className='h-[70px] flex items-center justify-between'>
              <span>Features</span>
              <NavigateNextIcon sx={{ fontSize:'24px' }}/>
            </li>
            <li>Solutions</li>
            <li>Plans</li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Header