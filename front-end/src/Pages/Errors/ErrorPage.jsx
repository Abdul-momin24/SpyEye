import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadNav from '../../Components/Navbar/UploadNav';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';

function ErrorPage() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="min-h-screen bg-[#021732] flex flex-col items-center">
    <ProgressBar/>
      <UploadNav />
      
      <div className="mt-24 text-center">
       <h1 className="text-3xl font-bold text-red-500 bg-red-900 bg-opacity-25 py-4 px-6 rounded-lg shadow-lg">
          Error: Invalid JSON File Format Detected!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-300 mt-4">
          Please ensure your JSON follows the correct format as shown below:
        </h2>

        
      </div>
      
      <div className="mt-10 w-[50%] p-10 bg-[#161B22] border border-[#30363d] rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#58A6FF]">
          JSON File Format
        </h1>
        <pre className="mt-5 text-lg text-yellow-200 bg-[#0D1117] p-5 rounded-lg overflow-auto">
{`{
  "Organisation": "Samsung Technologies",
  "Technologies": [
    "Technology 1",
    "Technology 2",
    "Technology 3",
    "Technology 4",
    "Technology 5"
  ]
}`}
        </pre>
        <div className="button mt-5 flex justify-center">
          <button
            className="bg-[#58A6FF] text-white py-2 px-5 rounded-2xl fira-sans-medium transition duration-300 ease-in hover:bg-[#1f6feb]"
            onClick={() => navigate('/upload')} // Navigate on click
          >
            Redirect to Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
