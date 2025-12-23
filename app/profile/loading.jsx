import Loader from "@components/Loader";
import { SkeletonLoader } from "@components/PromptSkeleton";

const Loading = () => {
  return (
    <div className='w-full animate-fadeIn'>
      <div className='flex justify-center mb-10 animate-slideInDown'>
        <Loader size="lg" text="Loading profile..." />
      </div>
      <SkeletonLoader count={6} />
    </div>
  );
};

export default Loading;
