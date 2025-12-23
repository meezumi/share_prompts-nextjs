import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const promptLength = post.prompt.length;
  const maxPromptLength = 2000;
  const isPromptValid = promptLength > 0 && promptLength <= maxPromptLength;
  
  const tagRegex = /^#[a-zA-Z0-9]+$/;
  const isTagValid = post.tag.length === 0 || tagRegex.test(post.tag);
  
  const isFormValid = isPromptValid && isTagValid && post.tag.length > 0;

  return (
    <section className="w-full max-w-full flex-start flex-col animate-slideInUp">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
        {/* here type is comming from page.js and is set to 'Create' */}
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism transition-all"
      >
        <label className="animate-slideInLeft" style={{ animationDelay: "100ms" }}>
          <span className="font-semibold text-base text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value.slice(0, maxPromptLength) })}
            placeholder="Write your post here"
            required
            maxLength={maxPromptLength}
            className="form_textarea transition-all focus:outline-2 focus:outline-black"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <div className="text-sm text-gray-500 mt-1 animate-fadeIn" style={{ fontFamily: "'Inter', sans-serif" }}>
            {promptLength}/{maxPromptLength} characters
            {promptLength === 0 && <span className="text-red-500 ml-2">Required</span>}
          </div>
        </label>

        <label className="animate-slideInRight" style={{ animationDelay: "200ms" }}>
          <span className="font-semibold text-base text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input transition-all focus:outline-2 focus:outline-black"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <div className="text-sm mt-1 animate-fadeIn" style={{ fontFamily: "'Inter', sans-serif" }}>
            {!isTagValid && post.tag.length > 0 && (
              <span className="text-red-500">Tag must start with # and contain only letters/numbers</span>
            )}
            {isTagValid && post.tag.length > 0 && (
              <span className="text-green-500">Valid tag</span>
            )}
            {post.tag.length === 0 && <span className="text-red-500">Required</span>}
          </div>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4 animate-slideInDown" style={{ animationDelay: "300ms" }}>
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className="px-5 py-1.5 text-sm bg-blue-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
          >
            {submitting ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                {`${type}ing...`}
              </>
            ) : (
              type
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
