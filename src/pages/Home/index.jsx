import Content from '~/components/Home/Content'
import Header from '~/components/Home/Header'
import Hero from '~/components/Home/Hero'
import { useUser } from '~/zustand/store'


const Layout = () => {
  const currentUser =useUser(state => state.user)
  console.log('🚀 ~ Layout ~ user:', currentUser)

  return (
    <div className='h-full bg-white'>
      <Header/>
      <Hero/>
      <Content/>
    </div>


  )
}

export default Layout