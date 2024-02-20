
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Button, Dialog, Slide, TextField } from '@mui/material'
import { forwardRef, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CancelIcon from '@mui/icons-material/Cancel'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const Hero = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>   <div className=" h-[90vh] bg-hero flex w-full ">
      <div className="lg:mx-20  md:mx-6 lg:mt-20 md:mt-18 md:flex  ">
        <div className="md:w-1/2 w-full flex flex-col gap-y-4 px-4 py-28 text-white gap-x-2  " >
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-medium text-center md:text-start md:leading-tight">Trello brings all your tasks, teammates, and tools together</h1>
          <p className="text-xl text-center md:text-start">Keep everything in the same place—even if your team isn’t.</p>
          <div className='flex  w-full justify-between items-center gap-4 text-white flex-col md:items-start'>
            <div className=' flex  w-full justify-between items-center gap-4  flex-col md:flex-row'>
              <TextField id="outlined-basic" label="Email" fullWidth variant="outlined" sx={{
                display: {
                  xs: 'none', // Hide on screens smaller than 'md'
                  md: 'block' // Show on 'md' screens and larger
                },
                width: '75%',
                input: { color: 'yellow' }, 'label': { color: 'gray' }
              }}
              InputProps={{
                style:{
                  background: 'white',
                  borderRadius: '5px',
                  color: 'black'

                }
              }} />
              <Button

                sx={{
                  color:'white',
                  height: '50px',
                  width:{
                    xs: '100%', // 100% width on small screens
                    md: '50%' // 50% width on medium screens
                  },
                  padding:{
                    xs: '10px', // 10px padding on small screens
                    md: '5px' // 15px padding on medium screens
                  },
                  bgcolor:'#0065ff',
                  '&:hover': {
                    bgcolor: '#0747a6'
                  } }} variant="contained" color="primary">Sign Up - It&apos;s Free</Button>
            </div>


            <Button onClick={handleOpen}>
              <div className='flex gap-x-1 items-center cursor-pointer'>
                <span className='underline text-[#ffffffcc] hover:text-white text-xl'>Watch video</span>
                <PlayCircleOutlineIcon sx={{ color:'white' }}/>
              </div>
            </Button>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                '& .MuiDialog-paper': {
                  overflow: 'visible'
                }
              }}

            >

              <div className='absolute right-[-20px] top-[-24px] z-50 '>
                <CancelIcon sx={{ fontSize: 50, color:'white' }} onClick={handleClose} className="cursor-pointer hover:text-[#002971]"
                />
              </div>

              <video width="720" height="405" controls className=''>

                <source src="/Trello _ Take A Tour Of Trello.mp4" type="video/webm" />
                  Your browser does not support the video tag.
              </video>


            </Dialog>


          </div>
        </div>

        <div className="md:w-1/2 gap-y-4 px-4 py-28 text-white gap-x-2 ">

          <img src = "/TrelloUICollage_4x.webp" alt="hero" className="" />

        </div>
      </div>

    </div>

    </>

  )
}

export default Hero