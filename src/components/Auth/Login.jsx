import { SvgIcon } from '@mui/material'
import { ReactComponent as Atlassian } from '~/assets/atlassian.svg'
import { ReactComponent as ImgLeft } from '~/assets/login-imgleft.svg'
import { ReactComponent as ImgRight } from '~/assets/login-imgright.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

import { yupResolver } from '@hookform/resolvers/yup'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import * as yup from 'yup'
import { loginApi, loginWithGoogle } from '~/apis/auth'
import { useAuth } from '~/customHooks/useAuth'
const schema = yup
  .object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')

  }).required()
export default function Login() {
  // const [checkLogin, setCheckLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = async(data) => {
    console.log(data)
    const result = await loginApi(data)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAuth()
    console.log('🚀 ~ onSubmit ~ result:', result)
  }
  const getDataFromGoogle = async (token) => {
    console.log('🚀 ~ getDataFromGoogle ~ token', token)
    const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.data)

    return userInfo
  }
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {

      const userInfo = await getDataFromGoogle(tokenResponse.access_token)
      const data = await loginWithGoogle(userInfo)
      console.log('🚀 ~ Login ~ data:', data)
    }
  })

  return (
    <div className='w-full h-[100vh] bg-[#fafbfc] fixed top-0'>

      <ImgLeft className="absolute w-96 bottom-0 -z-20" />
      <ImgRight className="absolute bottom-0 right-0 w-96 -z-10"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto my-0 text-black bg-white h-full flex w-[400px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] mt-12 items-center py-8 px-10 rounded-sm flex-col gap-y-6">
          <div className='gap-1 flex items-center justify-center'>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="large" sx={{ color:'#075bd6' }} />
            <h1 className='font-bold text-3xl'>Trello</h1>
          </div>
          <div className='font-medium text-[16px] text-[#172b4d]'>Sign up to continue</div>
          <div className='w-full h-10 border-gray-300  border-2 rounded-sm '>
            <input {...register('email')} className={`w-full h-full py-4 px-2 bg-gray-100 hover:bg-gray-200 focus:bg-white placeholder:text-sm  focus:outline-blue-500 ${errors.email?'focus:outline-red-500':''}` } placeholder='Enter your email' />
            <p className='text-red-500 text-[12px] pt-1'>{errors.email?.message}</p>
          </div>
          <div className='w-full h-10 border-gray-300  border-2 rounded-sm '>
            <input {...register('password')} type="text" className={`w-full h-full py-4 px-2 bg-gray-100 hover:bg-gray-200 focus:bg-white placeholder:text-sm  focus:outline-blue-500 ${errors.password?'focus:outline-red-500':''}` } placeholder='Enter your password' />
            <p className='text-red-500 text-[12px] pt-1'>{errors.password?.message}</p>
          </div>
          <p className='text-[12px] text-gray-500'>By Loging up, I accept the Atlassian
            <a href="https://www.atlassian.com/legal/cloud-terms-of-service" className='text-blue-500 hover:underline'> Cloud Terms of Service</a> and acknowledge the
            <a href="https://www.atlassian.com/legal/privacy-policy#what-this-policy-covers" className='text-blue-500 hover:underline'> Privacy Policy</a>
         .</p>


          <button className='w-full h-11 bg-[#0052cc] hover:bg-[#0065ff] text-white cursor-pointer rounded-sm'>
            <span className='font-medium text-sm'>Sign Up</span>
          </button>
          <div className='w-full flex items-center flex-col gap-4'>
            <span className='text-neutral-500'>Or continue with:</span>
            <button className='w-full h-11 border border-neutral-300 text-white cursor-pointer rounded-sm hover:bg-[#091e4205]' onClick={() => login()}>
              <div className='flex items-center justify-center gap-2'>
                <FcGoogle size={24}/> <span className='text-neutral-600 font-bold'>Google</span>

              </div>

            </button>

            <a href="/signup" className='text-blue-500 hover:underline text-sm '>Already have an Atlassian account? Sign up</a>
            <hr className='w-full bg-neutral-600' />
          </div>

          <div className='gap-1 flex items-center justify-center mt-2 flex-col text-[10px]'>
            <Atlassian className="w-40"/>
            <span>One account for Trello, Jira, Confluence and <a href="https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-account/" className='text-blue-500 hover:underline'> more</a> .</span>
            <span className='text-neutral-500 text-center'>This page is protected by reCAPTCHA and the Google <a href="" className='text-blue-500 hover:underline'>Privacy Policy</a> and <a href="" className='text-blue-500 hover:underline'>Terms of Service</a>  apply.</span>

          </div>


        </div>
      </form>

    </div>
  )
}
