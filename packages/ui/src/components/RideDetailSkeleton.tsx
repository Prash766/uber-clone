const RideDetailCardSkeleton = () => {
    return (
      <div className="grid grid-cols-8 items-start mb-2 h-[124px] w-full text-left p-4 rounded-lg border bg-white">
        <div className="col-span-2 flex -mt-4 mr-4 items-start">
          <div className="h-[124px] w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex flex-col items-start justify-center mt-2 col-span-4 space-y-2">
          <div className="flex space-x-2 items-center">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex mt-7 items-center justify-center col-span-2">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  };
  export { RideDetailCardSkeleton}