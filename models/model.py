import nvdlib 
import numpy as np
import json
import os
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# Function to encode dates cyclically
def cyclicEncode(year_month):
    if len(year_month) != 6 or not year_month.isdigit():
        return [0, 0, 0, 0]  # Return neutral encoding for invalid input

    year, month = int(year_month[:4]), int(year_month[4:6])
    month_angle = 2.0 * np.pi * (month - 1) / 12
    year_angle = 2.0 * np.pi * (year % 100) / 100
    return [np.sin(month_angle), np.cos(month_angle), np.sin(year_angle), np.cos(year_angle)]

# Function to train the regression model and make future predictions
def regressor(r):
    x, y = [], []

    for eachCVE in r:
        try:
            y.append(eachCVE.v31score)
            x.append(eachCVE.published[:4] + eachCVE.published[5:7])
        except:
            try:
                y.append(eachCVE.v30score)
                x.append(eachCVE.published[:4] + eachCVE.published[5:7])
            except:
                try:
                    y.append(eachCVE.v2score)
                    x.append(eachCVE.published[:4] + eachCVE.published[5:7])
                except:
                    pass

    if len(y) <= 10:
        return {}, np.float64(0.0), np.float64(0.0)  # Handle cases with too few CVEs

    X_encoded = np.array([cyclicEncode(date) for date in x])
    Y = np.array(y).reshape(-1, 1)

    poly = PolynomialFeatures(degree=2)
    X_poly = poly.fit_transform(X_encoded)

    model = LinearRegression()
    model.fit(X_poly, Y)

    future_dates = ['202403', '202404', '202405', '202406', '202407', '202408', 
                    '202409', '202410', '202411', '202412', '202501', '202502', 
                    '202503', '202504', '202505', '202506', '202507', '202508', 
                    '202509', '202510', '202511', '202512']
    
    future_X_encoded = np.array([cyclicEncode(date) for date in future_dates])
    future_X_poly = poly.transform(future_X_encoded)

    future_predictions = model.predict(future_X_poly)
    results = future_predictions.flatten()

    # Clip predictions to a max score of 10
    results = np.clip(results, 0, 10)
    rms = np.sqrt(np.mean(results ** 2))

    return dict(zip(future_dates, results)), np.around(results[0], decimals=1), np.around(rms, decimals=1)

# Function to analyze attack vectors
def analysis(base):
    json_path = "nvdcve-1.1-2023.json"
    
    if not os.path.exists(json_path):
        return {}  # Prevent crash if file is missing

    with open(json_path, "r", encoding="utf-8") as f:
        cve_data = json.load(f)

    vectors = {}
    count = 0

    for cve_item in cve_data.get('CVE_Items', []):
        try:
            base_score = cve_item['impact']['baseMetricV3']['cvssV3']['baseScore']
            if base == base_score:
                count += 1
                attack_vector = cve_item['impact']['baseMetricV3']['cvssV3']['attackVector']
                attack_complexity = cve_item['impact']['baseMetricV3']['cvssV3']['attackComplexity']

                if attack_vector not in vectors:
                    vectors[attack_vector] = [1, 0, 0, 0]
                else:
                    vectors[attack_vector][0] += 1

                if attack_complexity == "LOW":
                    vectors[attack_vector][1] += 1
                elif attack_complexity == "MEDIUM":
                    vectors[attack_vector][2] += 1
                elif attack_complexity == "HIGH":
                    vectors[attack_vector][3] += 1

        except KeyError:
            continue

    if count == 0:
        return {}  # Avoid division by zero

    results = {}
    for vector in vectors:
        vector_count = vectors[vector][0]
        weighted_score = ((vectors[vector][1] / vector_count) * 0.8) + \
                         ((vectors[vector][2] / vector_count) * 0.6) + \
                         ((vectors[vector][3] / vector_count) * 0.4)
        results[vector] = (vector_count / count) * weighted_score

    sorted_results = sorted(results.items(), key=lambda x: x[1], reverse=True)
    return {i[0]: i[1] for i in sorted_results}
