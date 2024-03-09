import MenuIcon from '@mui/icons-material/Menu'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { dataHeader } from '~/apis/dataHome'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
const Header = () => {
  const [openHeaderMobile, setOpenHeaderMobile] = useState(false)


  const toggleMenuMobile = () => {
    setOpenHeaderMobile(!openHeaderMobile)
  }
  return (

    <div className={' w-full text-[#172b4d] text-xl  transition-all z-10 h-[60px] fixed overflow-hidden'}>
      <div className={'bg-white w-full flex gap-x-3 items-center  z-50 fixed top-0 h-[60px] justify-between'}>
        <div className='flex  xl:mx-14'>
          <img src="/logo.svg" alt="trello logo" className="p-4 text-white"/>
          <div className='hidden md:flex'>{
            <ul className='flex'>
              {dataHeader.map((item) => (
                <li key={item.id} className='h-[70px] flex items-center justify-between text-[16px] px-4 pb-4 pt-5 cursor-pointer hover:text-[#0065ff]'>
                  <span>{item.value}</span>
                  <KeyboardArrowDownIcon sx={{ fontSize:'16px' }}/>
                </li>
              ))}


            </ul>}

          </div>
        </div>

        <a href="/board" className='text-white text-xl hidden md:flex bg-[#172b4d] hover:bg-[#505f79] h-full px-6 py-2 items-center  xl:mx-14'><button className='flex items-center justify-center' >Go to boards</button></a>
        <div className='cursor-pointer md:hidden xl:hidden '>
          {openHeaderMobile ? <CloseIcon sx={{ width:'40px', height:'40px', color:'black' }} onClick ={toggleMenuMobile} /> : <MenuIcon sx={{ width:'40px', height:'40px', color:'black' }} onClick ={toggleMenuMobile} />}

        </div>

      </div>
      <div className='relative md:hidden'>
        <div

          className={`bg-white w-full h-[calc(100vh-60px)] text-[#172b4d] text-xl transition absolute -top-16 ease-out delay-100 duration-500 ${openHeaderMobile ? 'translate-y-[118px]  opacity-1  ':'opacity-0 collapse' }`
          }>
          <div className='px-4 pb-4 '>
            <ul >
              {dataHeader.map((item) => (
                <>
                  <li key={item.id} className='h-[70px] cursor-pointer flex items-center justify-between'>
                    <span>{item.value}</span>
                    <NavigateNextIcon sx={{ fontSize:'24px' }}/>

                  </li>
                  <hr/>
                </>

              ))}

              <button className='text-white w-full mt-6 text-xl  md:flex bg-[#172b4d] hover:bg-[#505f79] h-full p-4 items-center  xl:mx-14' ><a href="/board" className='w-full'>Go to your boards</a> </button>


            </ul>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Header