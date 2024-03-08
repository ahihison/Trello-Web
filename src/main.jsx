import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>

      <ConfirmProvider
        defaultOptions={
          {
            allowClose:false,
            dialogProps:{
              maxWidth:'xs'
            },
            confirmationButtonProps:{
              color:'error', variant:'outlined'
            },
            cancellationButtonProps:{
              color:'inherit'
            }
          }
        }
      >
        <CssBaseline/>
        <GoogleOAuthProvider clientId="901628952757-84vq0sp5b11oit2qvefur9aerenlg665.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        <ToastContainer position='bottom-left' theme='colored'/>
      </ConfirmProvider>

    </CssVarsProvider>

  </React.StrictMode>
)
