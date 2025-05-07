# EEG TBI Classifier

This project is a web-based application designed to classify EEG data for traumatic brain injury (TBI) severity. It consists of a React-based frontend and a Flask-based backend. The application allows users to upload EEG data files, processes them using a machine learning model, and provides predictions along with visualizations.

## Features

- **File Upload**: Drag-and-drop functionality to upload EEG data files in `.xlsx` format.
- **Prediction**: Classifies EEG data into "Mild" or "Moderate" TBI severity using a pre-trained Random Forest model.
- **Visualization**: Displays mean EEG values by channel in an interactive chart.

## Project Structure

```
smart-health/
├── eeg-frontend/   # React-based frontend
│   ├── public/     # Static assets
│   ├── src/        # Source code
│   │   ├── components/  # Reusable React components
│   │   ├── App.js       # Main application logic
│   │   ├── App.css      # Styling
│   │   └── index.js     # Entry point
├── eeg-backend/    # Flask-based backend
│   ├── app.py      # Backend server logic
│   ├── model/      # Pre-trained model and scaler
│   └── requirements.txt  # Backend dependencies
```

## Prerequisites

- **Frontend**: Node.js and npm
- **Backend**: Python 3.x

## Setup Instructions

### Frontend

1. Navigate to the `eeg-frontend` directory:
   ```bash
   cd eeg-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

1. Navigate to the `eeg-backend` directory:
   ```bash
   cd eeg-backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   The server will run on [http://localhost:5000](http://localhost:5000).

## Usage

1. Start both the frontend and backend servers.
2. Upload an EEG data file in `.xlsx` format using the file uploader on the frontend.
3. Click the "Predict" button to classify the data.
4. View the prediction result and the EEG data visualization.

## Dependencies

### Frontend
- React
- Axios
- Chart.js
- React Dropzone
- Chart.js Zoom Plugin

### Backend
- Flask
- Flask-CORS
- Pandas
- NumPy
- Scikit-learn
- OpenPyxl
- Joblib

## License

This project is licensed under the MIT License.