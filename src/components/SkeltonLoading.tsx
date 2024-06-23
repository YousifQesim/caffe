const SkeletonLoadingCard = () => {
    return (
      <div className="bg-gray-200 px-6 py-4 w-32 h-24 rounded-lg shadow-md mb-4 animate-pulse">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-4"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 mb-2"></div>
            <div className="h-3 bg-gray-300"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoadingCard;