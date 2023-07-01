import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../components/moduleToolbar';


//código define um esquema de validação usando Yup para validar o título e o conteúdo 
const validationSchema = yup.object({
  title: yup.string('Adicione o titulo')
    .min(4, 'o conteúdo do texto deve ter no mínimo 4 caracteres')
    .required('Titulo do livro é obrigatório'),
  
  content: yup.string('Adicionar conteúdo de texto')
    .min(10, 'O conteúdo do texto deve ter no mínimo 10 caracteres')
    .required('O conteúdo do texto é obrigatório'),
});

const CreatePost = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: null,
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewPost(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });
  const createNewPost = async (values) => {
    try {
      const { data } = await axios.post('/api/post/create', values);
      toast.success('Livro Criado');
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: 'white', padding: '20px 200px' }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {' '}
          Create post{' '}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            id="title"
            label="Titulo Livro"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Titulo Livro"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Box sx={{ mb: 3 }}>
            <ReactQuill theme="snow" placeholder={'Escreva a descrição...'} modules={modules} value={values.content} onChange={(e) => setFieldValue('content', e)} />
            <Box component="span" sx={{ color: '#d32f2f', fontSize: '12px', pl: 2 }}>
              {touched.content && errors.content}
            </Box>
          </Box>

          <Box border="2px dashed blue" sx={{ p: 1 }}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              //maxFiles={3}
              onDrop={(acceptedFiles) =>
                acceptedFiles.map((file, index) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setFieldValue('image', reader.result);
                  };
                })
              }
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box {...getRootProps()} p="1rem" sx={{ '&:hover': { cursor: 'pointer' }, bgcolor: isDragActive ? '#cceffc' : '#fafafa' }}>
                  <input name="banner" {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <p style={{ textAlign: 'center' }}>
                        <CloudUploadIcon sx={{ color: 'primary.main', mr: 2 }} />
                      </p>
                      <p style={{ textAlign: 'center', fontSize: '12px' }}> Imagem aqui!</p>
                    </>
                  ) : values.image === null ? (
                    <>
                      <p style={{ textAlign: 'center' }}>
                        <CloudUploadIcon sx={{ color: 'primary.main', mr: 2 }} />
                      </p>
                      <p style={{ textAlign: 'center', fontSize: '12px' }}>Arraste e solte aqui ou clique para escolher!</p>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Box>
                          <img style={{ maxWidth: '100px' }} src={values.image} alt="" />
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{ mt: 3, p: 1, mb: 2, borderRadius: '25px' }}
            // disabled={loading}
          >
            Criar Livro
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
