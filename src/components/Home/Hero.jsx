
import { Button, TextField } from '@mui/material'
const Hero = () => {

  return (
    <>   <div className=" h-[90vh] bg-hero flex w-full">
      <div className="lg:mx-28 md:mx-20 md:mt-24 md:flex ">
        <div className="md:w-1/2 w-full flex flex-col gap-y-4 px-4 py-28 text-white" >
          <h1 className="md:text-5xl text-3xl font-bold text-center md:text-start">Trello brings all your tasks, teammates, and tools together</h1>
          <p className="text-xl text-center md:text-start">Keep everything in the same place—even if your team isn’t.</p>
          <div className='flex  w-full justify-between items-center gap-4 text-white'>

            <TextField id="outlined-basic" label="Email" fullWidth variant="outlined" sx={{
              display: {
                xs: 'none', // Hide on screens smaller than 'md'
                md: 'block' // Show on 'md' screens and larger
              },
              width: '75%'
            }}
            InputProps={{
              style:{
                background: 'white'
              }
            }} />
            <Button

              sx={{
                color:'white',
                height: '50px',
                width:{ xs: '100%', // 100% width on small screens
                  md: '50%' // 50% width on medium screens
                },
                bgcolor:'#0065ff',
                '&:hover': {
                  bgcolor: '#0747a6'
                } }} variant="contained" color="primary" size="medium">Sign Up - It&apos;s Free</Button>
          </div>
        </div>

        <div className="md:w-1/2">

          <img src = "/TrelloUICollage_4x.webp" alt="hero" className="" />

        </div>
      </div>


    </div>

    </>

  )
}

export default Hero