import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
