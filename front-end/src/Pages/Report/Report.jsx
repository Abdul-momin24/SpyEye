import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { useContext } from "react";
import { ReportContext } from "../../App";

const Report = () => {
  const { data } = useContext(ReportContext);

  let plot = data?.data?.data || [];
  let meta = data?.data?.meta || [];
  let technologies = data?.data?.technologies || [];

  const generateSuggestion = (maxKey) => {
    const suggestions = {
      NETWORK: "Focus on improving network security protocols and monitoring traffic for potential threats.",
      LOCAL: "Consider tightening local system security and managing physical access controls.",
      PHYSICAL: "Ensure robust physical security measures to protect critical infrastructure.",
      ADJACENT_NETWORK: "Monitor adjacent networks for unusual activity and strengthen network segmentation.",
    };
    return suggestions[maxKey] || "No specific suggestion available.";
  };

  return (
    <div className="bg-[#021732] min-h-screen py-5 flex flex-col justify-evenly items-center gap-10 w-screen relative">
    <ProgressBar />
      {data === "" ? (
        <h1 className="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 text-white fira-sans-medium text-[4rem] w-[30vw] h-[30vw] text-center align-middle">
          Invalid Route!
        </h1>
      ) : (
        <>
          <h1 className="bg-gradient-to-r from-[#2f6ef2] to-[#e936bf] bg-clip-text text-transparent text-[3.5rem] fira-sans-medium">
            Graph Reports
          </h1>
          <p className="text-gray-500 antialiased">
            Graphs of Base Metric Scores vs Dates
          </p>
          <div className="flex flex-col justify-evenly items-center overflow-hidden gap-10 w-[85%]">
            {plot.map((item, index) => (
              <div
                className="flex flex-col justify-evenly items-start w-[99%] gap-5 p-5 border-2 border-zinc-800 rounded-xl bg-[#061a34]"
                key={index}
              >
                <h1 className="text-white fira-sans-medium text-[2.5rem]">
                  {technologies[index]}
                </h1>
                <div className="flex flex-row justify-evenly items-center gap-10">
                  <LineChart
                    width={500}
                    height={300}
                    data={item}
                    className="shrink-0 w-[50%]"
                  >
                    <XAxis dataKey="name" padding={{ bottom: 30 }} />
                    <YAxis type="number" domain={[0, 10]} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="baseMetric" stroke="#ffffff" />
                  </LineChart>
                  <div className="flex flex-col justify-evenly items-start gap-4">
                    {meta[index] && meta[index].length > 0 ? (
                      meta[index].map((metaItem, metaIndex) => {
                        const keys = Object.keys(metaItem);
                        if (keys.length === 0) return null;

                        const maxKey = keys.reduce(
                          (max, key) => (metaItem[key] > metaItem[max] ? key : max),
                          keys[0]
                        );

                        return (
                          <div key={metaIndex} className="w-full">
                            <h2 className="text-white text-lg fira-sans-medium">
                              {["Attack Vector Predictions for the Next Month", "Attack Vector Predictions for the Next Year"][metaIndex]}
                            </h2>

                            {keys.map((metaItemVector, metaItemVectorIndex) => (
                              <div
                                className="flex flex-col justify-evenly items-center gap-[5px] w-[100%]"
                                key={metaItemVectorIndex}
                              >
                                <h3 className="text-white text-md fira-sans-extralight">
                                  {metaItemVector}
                                </h3>
                                <div className="w-[80%] rounded bg-gray-200 h-[20px]   flex justify-normal items-center ">

                                  <div
                                    className="rounded bg-red-600 h-[20px]"
                                    style={{
                                      width: `${metaItem[metaItemVector] * 100}%`,
                                    }}
                                  >
                                  </div>
                                      <p className="text-red-500 text-sm font-semibold mx-2">
                                    {`${(metaItem[metaItemVector] * 100).toFixed(2)}%.`}
                                  </p>
                                </div>
                              </div>
                            ))}
                            <div className="mt-4">
                            <h3 className="text-green-400 text-md fira-sans-medium mb-2">
                              {`The highest predicted value is in "${maxKey}": ${(metaItem[maxKey]*100).toFixed(2)}%`}
                            </h3>
                              <h4 className="text-yellow-300 text-md fira-sans-medium">
                                Suggestion:
                              </h4>
                              <p className="text-gray-300 text-sm">
                                {generateSuggestion(maxKey)}
                              </p>
                            </div>
                            <hr className="border-gray-200 w-[98%]" />
                          </div>
                        
                        );
                      })
                    ) : (
                      <h2 className="text-gray-400 text-md">No data available for predictions.</h2>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
