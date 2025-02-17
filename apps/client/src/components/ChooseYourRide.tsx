import RideDetailCard from "./RideDetailCard";

const ChooseYourRide = () => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-85px)]">
      <h1 className="font-uber text-4xl font-bold">Choose a ride</h1>
      <div className="">
            <p className="font-uber font-semibold text-2xl mb-4 ">Recommended</p>
            {[...Array(3)].map((_) => (
          <RideDetailCard />
             ))}
      </div>
      <div className="">
        <h2 className="font-uber font-semibold text-2xl mb-4">Economy</h2>
        {[...Array(3)].map((_) => (
          <RideDetailCard />
        ))}
      </div>
    </div>
  );
};

export default ChooseYourRide;
