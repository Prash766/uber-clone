import Button from '@repo/ui/button';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button />
      <p className="p-6 text-center text-white bg-red-600 rounded-lg shadow-lg">
        This is a styled paragraph with Tailwind CSS!
      </p>
    </div>
  );
}

export default App;
