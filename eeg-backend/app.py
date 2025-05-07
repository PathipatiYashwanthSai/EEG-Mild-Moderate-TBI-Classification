from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import pandas as pd
import numpy as np


app = Flask(__name__)
CORS(app)  # allow requests from React dev server

# preload model
model = load('model/Random_Forest_0.8185.joblib')

def mild_or_moderate(prediction):
    return "Mild" if prediction == 1 else "Moderate"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file uploaded'}), 400

    file = request.files['file']
    df = pd.read_excel(file)  # requires openpyxl
    
    print("COLUMNS:", df.columns.tolist())

    # drop unwanted
    df = df.drop(['Band', 'Bandwidth', 'Group'], axis=1, errors='ignore')

    # per‑subject scoring (for now we take the first subject)
    df_grouped = df.groupby('SubjectID', group_keys=False)
    results = []
    for subject, group in df_grouped:
        X = group.drop(['SubjectID'], axis=1, errors='ignore')
        scaler = load('model/scaler.joblib')
        X_scaled = scaler.transform(X.values)

        preds = model.predict(X_scaled)
        avg_score = np.mean(preds)
        clsf = mild_or_moderate(int(np.floor(avg_score + 0.5)))
        results.append({
            "subject": subject,
            "classification": clsf,
            "average_score": avg_score
        })

    # build chart data: list of { channel, mean }
    # assumes original df has columns "Channel" and "Mean"
    # chart_df = df.groupby("Channel")["Mean"].mean().reset_index()
    # chart_data = chart_df.to_dict(orient='records')

    # — if long format
    if "Channel" in df.columns and "Mean" in df.columns:
        chart_df = df.groupby("Channel")["Mean"].mean().reset_index()
    # — else: assume each remaining column is a channel
    else:
        # drop SubjectID and any non-numeric columns
        drop_cols = ["SubjectID", "Band", "Bandwidth", "Group"]
        numeric_df = df.drop(columns=[c for c in drop_cols if c in df.columns], errors='ignore')
        # compute means for each channel (i.e. each column)
        chart_df = numeric_df.mean().reset_index()
        chart_df.columns = ["Channel", "Mean"]

    chart_data = chart_df.to_dict(orient='records')

    # respond
    return jsonify({
        "result": results[0]["classification"],
        "average": results[0]["average_score"],
        "chartData": chart_data
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
