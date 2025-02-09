import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ReportContext } from "../../App";
const API_URL = import.meta.env.VITE_API_URL;

import UploadNav from "../../Components/Navbar/UploadNav";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

import Folder from "./Folder.webp";
import Superman from "./superman-punch.mp4";

import axios from "axios";

const LoaderModal = () => {
  return (
    <div className="h-screen w-screen relative z-[10000] flex items-center justify-center">
      <div className="w-[30vw] h-[25vw] flex flex-col justify-evenly items-center gap-5">
        <video src={Superman} className="rounded-full w-[25vw]" loop autoPlay></video>
        <h1 className="text-white fira-sans-medium text-xl text-center">
          Scouring Through 200k Entries, Just For You 😗...
        </h1>
        <p className="text-gray-500 antialiased text-center">
          Fun Fact: SpyEye is Superman's strength {`;)`}
        </p>
      </div>
    </div>
  );
};

const Upload = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();
  const { data, setData } = useContext(ReportContext);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FileUpload", file);

    setLoading(1);

    try{

      const result = await axios.post(
        `${API_URL}/models/coefficients`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );


      setLoading(0);
      setData(result);
      navigate("/report");
    }catch (error){
      console.error(error);
      navigate("/Error");
      return;
    }
    
    
  };

  return (
    <div className="bg-[#021732] py-16">
      {loading && <LoaderModal />}
      <UploadNav />

      {!loading && (
        <>
          <ProgressBar />
          <div className="min-h-screen flex flex-col items-center gap-16">
            <div className="w-[80%] h-auto p-10 border-2 border-zinc-700 rounded-2xl">
              <div className="w-full h-auto border-2 border-dashed border-zinc-800 rounded-2xl p-10 flex flex-col items-center gap-6">
                <h1 className="fira-sans-medium text-[3.5rem] text-white text-center">
                  Upload Your JSON
                </h1>
                <p className="text-gray-500 antialiased text-[1.75rem] text-center">
                  Fast and Easy Way
                </p>
                <img src={Folder} alt="" className="scale-[80%]" />
                <form className="flex flex-col items-center gap-5">
                  <input
                    type="file"
                    accept=".json"
                    name="FileUpload"
                    id="FileUpload"
                    className="text-white py-3 px-5 border-2 border-zinc-600 rounded"
                    onChange={onInputChange}
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white py-3 px-8 border-2 border-zinc-600 rounded-lg bg-[#143764] hover:bg-[#162a44] hover:scale-110 transition-transform duration-200 shadow-md"
                  >
                    Run Model 🚀
                  </button>
                </form>
                <p className="text-gray-500 antialiased text-sm mt-2">
                  Check out the JSON Format Below!
                </p>
              </div>
            </div>
          </div>
          <div className="h-auto flex justify-center mt-10">
            <div className="w-[40%] p-10 border-2 border-zinc-700 rounded-2xl flex flex-col gap-5 text-white">
              <h1 className="fira-sans-medium text-3xl text-center">
                JSON File Format
              </h1>
              <pre className="text-yellow-200 text-lg">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Upload;
