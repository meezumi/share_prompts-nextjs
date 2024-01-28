"use client";

import { useEffect, useState } from "react";
// this will let us know which user is about to log in
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

import React from "react";

const EditPrompt = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  // to check if the prompt is being submitted

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    // e is the event.
    e.preventDefault();
    // prevents reload of the browser when submitting form
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found.')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // <div>Create Prompt</div>
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
