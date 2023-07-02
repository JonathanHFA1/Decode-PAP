import React from 'react'
import {auth} from '../firebase'
import '../index.css'

const style = {
    button: `  text-white bg-orange-600 px-5 hover:bg-orange-700 rounded-md`
}

const LogOut = () => {
const signOut = () => {
    signOut(auth)
}

  return (
    <button onClick={() => auth.signOut()} className={style.button}>
        Logout
    </button>
  )
}

export default LogOut