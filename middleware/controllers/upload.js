import * as fs from "node:fs";
import axios from "axios";

const uploader = async (req, res, next) => {
  try {
    const filePath = `./uploads/${req.fileName}`;

    // Check if file exists before reading
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ error: "File not found" });
    }

    fs.readFile(filePath, "UTF-8", async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Failed to read the file" });
      }

      let dataInformation;
      try {
        dataInformation = JSON.parse(data); // Ensure valid JSON
      } catch (error) {
        console.error("Invalid JSON:", error);
        return res.status(400).json({ error: "Invalid JSON format" });
      }

      try {
        const response = await axios.post("http://127.0.0.1:5000/predict", dataInformation, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Post request sent successfully:", response.data);

        const dataProcessed = [];
        const dataMeta = [];
        const dataTechnologies = [];

        for (let i = 0; i < response.data.length; i++) {
          const keys = Object.keys(response.data[i].coords);
          const values = Object.values(response.data[i].coords);

          const temp = [];
          const temp2 = [
            response.data[i]["attack-vectors-month"],
            response.data[i]["attack-vectors-year"],
            response.data[i]["base-score-month"],
            response.data[i]["base-score-year"],
          ];

          for (let j = 0; j < keys.length; j++) {
            temp.push({
              name: `${keys[j].substring(4, 6)}/${keys[j].substring(0, 4)}`,
              baseMetric: Number(values[j]),
            });
          }

          dataProcessed.push(temp);
          dataMeta.push(temp2);
          dataTechnologies.push(response.data[i]["technology"]);
        }

        return res.status(200).json({
          data: dataProcessed,
          meta: dataMeta,
          technologies: dataTechnologies,
        });
      } catch (error) {
        console.error("Error in Axios request:", error.message);
        return res.status(500).json({ error: "Failed to send request to backend" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default uploader;
