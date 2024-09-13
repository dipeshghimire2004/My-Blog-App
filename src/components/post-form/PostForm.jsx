import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useSelector} from 'react-redux'


function PostForm({post}) {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        control
    }=useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active',
        }
    });

    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);

    const submit=async(data)=>{
        if(post){
            const file=data.image[0]? await appwriteService.uploadFile(data.image[0]):null;

            if(file){
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file ? file.$id : post.featuredImage,
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        //Creating new post
        }else{
            const file =data.image[0]? await appwriteService.uploadFile(data.image[0]) : null;
            
            if(file){
                data.featuredImage=file$id;

                const dbPost=await appwriteService.createPost({
                    ...data,
                    userId : userData.$id,
                });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }


    const slugTransform=useCallback((value)=>{
        if(typeof value === 'string'){
            return value.trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
        }
        return '';
    },[]);

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title),{shouldValidate:true})
            }
        });
    },[watch, setValue, slugTransform])


  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className='flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title",{required:true})}
                />

                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug",{required:true})}
                    onInput={(e)=>{
                        setValue('slug',slugTransform(e.currentTarget.value),{
                            shouldValidate:true
                        });
                    }}
                />

                <RTE label='Content: ' name="content" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className='w-1/2 px-2'>
                <Input
                    label='Featured Image :'
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    {...register("image", { required: !post })} // Image field required only if there is no existing post
                />
                {post && (
                    // Show existing featured image if editing a post
                    <div className='w-full mb-4'>
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label='Status'
                    className='mb-4'
                    {...register("status", { required: true })} // Register status field with validation
                />
                <Button type='submit' bgColor={post ? 'bg-green-500' : undefined} className="w-full">
                    {post ? "Update" : "Submit"} 
                </Button>
                {/* // Button text changes based on whether it's creating or updating a post */}
   
            </div>

        </form>
    </div>
  )
}

export default PostForm
