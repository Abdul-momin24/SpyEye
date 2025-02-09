from flask import Flask, request, jsonify
import nvdlib
import numpy as np
from sklearn.linear_model import LinearRegression
from model import regressor, cyclicEncode, analysis
import os
from dotenv import load_dotenv
import logging
import time

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

def fetch_cve_data(technology, retries=3, delay=5):
    """Fetches CVE data with retries and delay handling."""
    for attempt in range(retries):
        try:
            return nvdlib.searchCVE(
                keywordSearch=technology,
                key=api_key,
                delay=1
            )
        except Exception as e:
            logger.warning(f"Attempt {attempt + 1} failed for {technology}: {str(e)}")
            time.sleep(delay)
    return None  # Return None if all attempts fail

def fetch_all_cve_data(technology):
    """Fetches all CVE data using pagination."""
    start_index = 0
    results = []
    
    while True:
        try:
            response = nvdlib.searchCVE(
                keywordSearch=technology, 
                key=api_key, 
                delay=1, 
                startIndex=start_index, 
                resultsPerPage=2000
            )
            
            if not response:
                break  # No more results
            
            results.extend(response)
            start_index += len(response)  # Move to next batch
            
        except Exception as e:
            logger.warning(f"Error fetching CVEs for {technology}: {str(e)}")
            break  # Stop if API errors out
    
    return results

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data or "Technologies" not in data:
            return jsonify({"error": "'Technologies' field is missing in request data"}), 400
        
        tech_list = data["Technologies"]
        predicted_data = []

        for technology in tech_list:
            try:
                r = fetch_cve_data(technology)

                if r is None:
                    logger.error(f"Skipping {technology} due to API failure")
                    continue  # Skip this technology

                coefficients = regressor(r)
                attack_vectors_month = analysis(coefficients[1])
                attack_vectors_year = analysis(coefficients[2])

                predicted_data.append({
                    "technology": technology,
                    "coords": coefficients[0],
                    "base-score-month": coefficients[1],
                    "base-score-year": coefficients[2],
                    "attack-vectors-month": attack_vectors_month,
                    "attack-vectors-year": attack_vectors_year,
                })

            except Exception as e:
                logger.error(f"Error processing technology {technology}: {str(e)}")
                continue  # Skip this technology

        return jsonify(predicted_data)

    except Exception as e:
        logger.error(f"Internal Server Error: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
