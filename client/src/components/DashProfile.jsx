import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux' 

export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            <TextInput placeholder='username' type='text' id='username' defaultValue={currentUser.username} />
            <TextInput placeholder='email' type='email' id='email' defaultValue={currentUser.email} />
            <TextInput placeholder='password' type='password' id='password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
            <div className='text-red-500 flex justify-between mt-4'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
      </form>
    </div>
  )
}