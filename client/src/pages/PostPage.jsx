import { Alert, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { GoBookmark } from "react-icons/go";
import { MdBookmarkAdded } from "react-icons/md";
import { useSelector } from "react-redux";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({isSaved: true})

    useEffect(() => {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
          const data = await res.json();
          if(res.ok){
            setPost(data.posts[0])
            setLoading(false)
            setError(false)
          }else{
            setError(true)
            setLoading(false)
            return;
          }
        } catch (error) {
          setError(true)
          setLoading(false)
        }
      }
      fetchPost();
    }, [postSlug])

    if(loading){
      return <div className="flex justify-center items-center min-h-screen"><Spinner size='xl'/></div>
    }

    const handleSave = async() => {
        try {
            const res = await fetch(`/api/post/updatepost/${post._id}/${currentUser._id}`, {
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
                navigate(`/post/${post.slug}`); 
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    

  return (

    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        {post.isSaved ? (<>
            <MdBookmarkAdded size={32}/>
        </>) : (<GoBookmark size={32} onClick={handleSave}/>)}
      </div>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button color='gray' pill size='sm'>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
      <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="text-black font-semibold text-lg">Ingredients</span>
        <span className="italic">{post && (post.content.length/1000).toFixed(0)} mins read</span>
      </div>

      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.ingredients}}></div>

      <div className="flex justify-center p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
        <h1 className="text-lg font-semibold text-black">Steps to make</h1>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}></div>
    </main>
  )
}