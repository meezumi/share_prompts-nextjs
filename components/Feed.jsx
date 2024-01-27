'use client'
// here we are going to show all the prompts

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}  
        />
      ))}
      {/* but to show the prompts we need to fetch them from our own api */}
    </div>
  );
};
// PromptCardList is only going to be used on this specific feed, so we create it outside Feed() function

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");

      const data = await response.json();

      setPosts(data);
    }

    console.log(posts);

    fetchPosts(); // calling the above function
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for Prompts, Tag or Username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />

      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
      
    </section>
  )
}

export default Feed