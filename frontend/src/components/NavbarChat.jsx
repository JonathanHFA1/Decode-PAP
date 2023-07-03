import React from 'react';
import SignIn from './SignIn'
import LogOut from './LogOut'
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
const style = {
    nav: ` bg-orange-600 rounded-lg h-20 text-xl flex justify-evenly items-center p-4`,
    heading: `text-white text-3xl`
}

const Navbar = () => {
    const [user] = useAuthState(auth)
    console.log(user)
  return (
    <div className={style.nav}>
      <h1 className={style.heading}>Expressa a tua opinião</h1>
      {user ? <LogOut /> : <SignIn />}
        <a href="../" className='text-white'> Home </a>

    </div>
  );
};

export default Navbar;
