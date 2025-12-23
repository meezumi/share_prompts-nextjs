import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full animate-slideInUp">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {data.length > 0 ? (
        <div className="mt-10 prompt_layout animate-fadeIn">
          {data.map((post, index) => (
            <div key={post._id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slideInUp">
              <PromptCard
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-500 animate-fadeIn">
          <p>No prompts yet. Start creating to see your posts here!</p>
        </div>
      )}
    </section>
  );
};

export default Profile;
