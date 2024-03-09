import Cookies from 'js-cookie'

export const useAuth = () => {
  console.log('🚀 ~ useAuth ~ :', Cookies.get('refreshToken'))
  //getting token from local storage
  const user = localStorage.getItem('token')
  //checking whether token is preset or not
  if (user) {
    return true
  } else {
    return false
  }
}

