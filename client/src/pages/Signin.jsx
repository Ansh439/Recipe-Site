import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {
    const [formData, setFormData] = useState({});
    const {loading, error: errMessage} = useSelector(state => state.user);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  }


  const handelSubmit = async(e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
        return dispatch(signInFailure("Please fill out all the fields"));
    }

    try{
        dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      // console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return ;
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch(err){
        dispatch(signInFailure(err.message));
    }
  }


  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-400 via-lime-400 to-blue-300 rounded-lg text-white md:mr-1'>
                Quick
            </span>
            Cook
          </Link>
          <p className='text-sm mt-5'>
            A place where you can find your taste and explore the magic of your hands.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
            <div>
              <Label value='Enter Email' />
              <TextInput
              type='email'
              placeholder="email"
              id="email"
              onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Enter Password' />
              <TextInput
              type='password'
              placeholder="password"
              id="password"
              onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='greenToBlue' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>                    
                ) : 'Sign In'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an acoount?</span>
            <Link to='/signup' className='text-green-500 hover:underline font-semibold'>
              Sign Up
            </Link>
          </div>
          {
            errMessage && (
              <Alert className='mt-5' color='failure'>
                {errMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )

}