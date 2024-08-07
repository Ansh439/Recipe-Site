import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  }


  const handelSubmit = async(e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      setErrMessage("Please fill out all the fields");
      return ;
    }

    try{
      setloading(true);
      setErrMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setloading(false);
        return setErrMessage(data.message);
      }
      setloading(false);
      if(res.ok){
        navigate('/signin');
      }
    }catch(err){
      setErrMessage(data.message);
      setloading(false);
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
              <Label value='Enter Username' />
              <TextInput
              type='text'
              placeholder="username"
              id="username"
              onChange={handleChange}
              />
            </div>
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
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an acoount?</span>
            <Link to='/signin' className='text-green-500 font-semibold hover:underline'>
              Sign In
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