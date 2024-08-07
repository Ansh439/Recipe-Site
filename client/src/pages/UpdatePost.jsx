import React, {useEffect, useState} from 'react'
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [publishError, setPublicError] = useState(null)
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user); 
  const {postId} = useParams();

  useEffect(() => {
    try {
        const fetchPost = async () => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`)
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
                setPublicError(data.message);
                return ;
            }else{
                setPublicError(null);
                setFormData(data.posts[0]);
            }
        }

        fetchPost();
    } catch (error) {
        console.log(error.message);
    }
  }, [postId])

  const handleUploadImage = async () => {
    try {
      if(!file){
        setImageUploadError("Please select an image");
        return ;
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("image upload failed")
          setImageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null)
            setImageUploadProgress(null)
            setFormData({...formData, image: downloadURL});
          })
        }
      )
    } catch (error) {
      setImageUploadError('image upload failed')
      setImageUploadProgress(null)
      console.log(error);
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(!res.ok){
        setPublicError(data.message);
        return;
      }
      else{
        setPublicError(null)
        navigate(`/post/${data.slug}`); 
      }
    } catch (error) {
      setPublicError('Something went wrong')
    }
  }

  return <div className='min-h-screen p-3 max-w-3xl mx-auto'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Edit post</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title}/>
        <Select
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          value={formData.category}
        >
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
        <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>{
          imageUploadProgress ? 
          <div className='w-16 h-16'>
            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
          </div> : "Upload Image"
        }</Button>          
      </div>
      {
        imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
      }
      {
        formData.image && (
          <img
          src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
          />
        )
      }
      <div className='h-72 flex gap-2 md:flex-row mb-12'>
        <ReactQuill theme='snow' placeholder='Write all the required Ingridients (recommended in bullet points)...' value={formData.ingredients} className=' mb-12' required onChange={(value) => setFormData({...formData, ingredients: value})} />
        <ReactQuill theme='snow' value={formData.content} placeholder='Write process to make (recommended in bullet points)...' className='mb-12' required onChange={(value) => setFormData({...formData, content: value})} />
      </div>
      <Button type='submit' gradientDuoTone='purpleToPink'>Update post</Button>
      {
        publishError && <Alert color='failure' className='mt-5'>
          {publishError}
        </Alert>
      }
    </form>
  </div>
} 
