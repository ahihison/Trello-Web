
import { TextField } from '@mui/material'
const Hero = () => {
  return (
    <>   <div className=" h-[80vh] bg-hero flex w-full">
      <div className="mx-16 mt-24">
        <div className="w-1/2 flex flex-col gap-y-4 px-4 py-28" >
          <h1 className="text-5xl font-bold">Trello brings all your tasks, teammates, and tools together</h1>
          <p className="text-xl">Keep everything in the same place—even if your team isn’t.</p>

          <TextField id="outlined-basic" label="Email" variant="outlined" />
        </div>

        <div className="w-1/2"></div>
      </div>

    </div>

    </>

  )
}

export default Hero