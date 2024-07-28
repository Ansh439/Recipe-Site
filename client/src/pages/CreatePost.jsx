import React from 'react'
import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return <div className='min-h-screen p-3 max-w-3xl mx-auto'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Share an interesting Recipe</h1>
    <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Dish Name' required id='title' className='flex-1'/>
        <Select>
          <option value='uncategorized'>Select a category</option>
          <option value='quick'>Quick & Easy</option>
          <option value='healthy'>Healthy</option>
          <option value='meal'>Meal Prep</option>
          <option value='breakfast'>Breakfast</option>
          <option value='snack'>Snacks</option>
          <option value='budget'>Budget Friendly</option>
        </Select>
      </div>
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput type='file' accept='image/*' />
        <Button type='button' gradientDuoTone='greenToBlue' size='sm' outline>Upload Image</Button>          
      </div>
      <ReactQuill theme='snow' placeholder='Type something...' className='h-72 mb-12' required/>
      <Button type='submit' gradientDuoTone='greenToBlue'>Publish</Button>
    </form>
  </div>
}