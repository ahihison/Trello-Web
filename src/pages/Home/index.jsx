import Content from '~/components/Home/Content'
import Header from '~/components/Home/Header'
import Hero from '~/components/Home/Hero'

const Layout = () => {
  return (
    <div className='h-full bg-white'>
      <Header/>
      <Hero/>
      <Content/>
    </div>


  )
}

export default Layout