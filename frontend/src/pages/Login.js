import { Avatar, Box } from '@mui/material';
import React, { useEffect } from 'react';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from '../redux/actions/userAction';
import Navbar from '../components/Navbar';
import frontImage from '../assets/frontImg.png';
import Button from '@mui/material/Button';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  //redirecionar o usuário após o processo de autenticação
  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(userSignInAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full h-screen ">
        <div className="hidden h-[85%] w-[50%] flex-col  items-center justify-center lg:flex ">
          <div className=" mb-10 flex w-[75%] justify-center ">
            <h1 className="self-start text-5xl text-white uppercase ">Comece a Viajar pelos livros</h1>
          </div>

          <img className="w-[75%]" src={frontImage} alt="Front Livros" />
          <div className="flex w-[75%] flex-col justify-center ">
            <p className="mt-5 mb-3 text-xl text-white">&quot;Há livros escritos para evitar espaços vazios na estante&quot;</p>
            <h6 className="text-sm text-white">Carlos Drummond de Andrade</h6>
          </div>
        </div>
        <div className="w-[40%]">
          <Box sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.white' }}>
            <Box onSubmit={formik.handleSubmit} component="form" className="form_style border-style">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Avatar sx={{ m: 1, bgcolor: '#FF4E16', mb: 3 }}>
                  <LockClockOutlined />
                </Avatar>
                <TextField
                  className="text-white"
                  sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                      color: 'black',
                    },
                    bgcolor: { background: '#ffff' },
                    borderRadius: { borderRadius: '100px' },
                    width: { width: '320px' },
                  }}
                  fullWidth
                  id="email"
                  name="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="E-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                      color: 'black',
                    },
                    bgcolor: { background: '#ffff' },
                    borderRadius: { borderRadius: '100px' },
                    width: { width: '320px' },
                  }}
                  fullWidth
                  id="password"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <div className="flex flex-col gap-5">
                  <Button sx={{ bgcolor: '#FF4E16', color: 'white', outlineColor: 'white', width: '320px', borderRadius: '100px' }} fullWidth variant="text" type="submit">
                    Log In
                  </Button>
                  <Button sx={{ color: '#FF4E16' }}>
                    <a href="/register"> Não tem conta? Registe-se aqui </a>
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
