const NavBar = () => {
  return (
    <div className="min-w-full bg-black text-white p-6 flex justify-between items-center">
      <div className="flex items-center space-x-9 ml-10  ">
        <div className="text-2xl font-bold cursor-pointer">Uber</div>
        <ul className="flex space-x-7 cursor-pointer">
          <li>About</li>
          <li>About</li>
        </ul>
      </div>
      <ul className="text-white font-semi-bold flex space-x-8 mr-10 cursor-pointer ">
        <li>Sign In</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
};

export default NavBar;
