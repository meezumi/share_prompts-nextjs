"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import PromptSkeleton, { SkeletonLoader } from "./PromptSkeleton";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout animate-fadeIn'>
      {data.map((post, index) => (
        <div key={post._id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slideInUp">
          <PromptCard
            post={post}
            handleTagClick={handleTagClick}
          />
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (pageNum = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/prompt?page=${pageNum}&limit=10`);
      const data = await response.json();
      
      if (data.error) {
        console.error("Error fetching posts:", data.error);
      } else {
        setAllPosts(data.prompts);
        setPage(data.page);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method - waits 500ms after user stops typing before searching
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPosts(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts prompts matching the search field*/}
      {searchText ? (
        <>
          {searchedResults.length > 0 ? (
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <div className="text-center mt-10 text-gray-500 animate-fadeIn">
              <p>No results found for "{searchText}"</p>
            </div>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <SkeletonLoader count={10} />
          ) : (
            <>
              <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-2 animate-slideInUp">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isLoading}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-all"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        disabled={isLoading}
                        className={`px-3 py-2 rounded transition-all ${
                          page === p
                            ? 'bg-blue-600 text-white scale-110'
                            : 'bg-gray-300 hover:bg-gray-400'
                        } disabled:opacity-50`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || isLoading}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
