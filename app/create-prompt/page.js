'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
// this will let us know which user is about to log in
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

import React from 'react'

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  // to check if the prompt is being submitted   

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  
  const createPrompt = async (e) => {
    // e is the event.
    e.preventDefault(); 
    // prevents reload of the browser when submitting form
    setSubmitting(true); 

    try {
      const response = await fetch('/api/prompt/new',
      {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt, 
          userId: session.user.id,
          tag: post.tag
        })
      })

      if(response.ok) {
        router.push('/');
      } 

    } catch (error) {
        console.log(error);

    } finally {
      setSubmitting(false);
    }

  }

  return (
    
    // <div>Create Prompt</div>
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;