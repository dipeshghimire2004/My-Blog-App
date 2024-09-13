import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/container/Container'
import { PostForm } from '../components'




function EditPost() {
    const [post, setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
              if(post){
                setPost(post);
              } 
              else navigate('/')    
            })
        }
        else{
            navigate("/")
          }
    },[slug,navigate])
  return post ? (
    <Container>
        <PostForm post={post} />
    </Container>
  ) : ( <div>Loading...</div> )
}

export default EditPost
