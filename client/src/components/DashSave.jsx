import { Table, Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashSave() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const {currentUser} =  useSelector(state => state.user);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({isSaved: false});

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await fetch(`/api/post/getposts?isSaved=${true}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser){
      fetchPosts();
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  
  const removeSave = async(postId) => {
    try {
        const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if(!res.ok){
            setError(true)
            return;
        }
        else{
            navigate(`/dashboard`); 
        }
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <div className='overflow-x-scroll table-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser && userPosts.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Date Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Remove</Table.HeadCell>
              </Table.Head>
              {
                userPosts.map((post) => (
                  <Table.Body className='divide-y' key={currentUser._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img 
                            src={post.image}
                            className='w-20 h-10 object-cover bg-gray-500'
                            alt={post.title}
                          />
                        </Link>
                      </Table.Cell>

                      <Table.Cell>
                        <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                      </Table.Cell>

                      <Table.Cell>{post.category}</Table.Cell>

                      <Table.Cell onClick={() => removeSave(post._id)}>
                          <span className='hover:text-red-500 cursor-pointer'>Remove</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
            {
              showMore && <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
            }
          </>
        ) : (
          <p> You have no posts yet! </p>
        )
      }
      
    </div>
  )
}