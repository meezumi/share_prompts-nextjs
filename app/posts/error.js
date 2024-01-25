"use-client"; // error components must be client components

import { useEffect } from "react";

const Error = ({error, reset}) => {

  useEffect(() => {
    console.error(error);
  }, [error]);

return (
  <div>
    <h2> something went wrong. </h2>
    <button
      onClick={
        // attempt to recover by trying to re-render the segment.
        () => reset()
      }
      >
      Try again
      </button>
  </div>
  );

}

export default Error;