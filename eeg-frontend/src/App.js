import React, { useState } from 'react';
import axios from 'axios';

import FileUploader from './components/FileUploader';
import ResultBadge  from './components/ResultBadge';
import EEGChart     from './components/EEGChart';

function App() {
  const [file, setFile]       = useState(null);
  const [chartData, setChart] = useState(null);
  const [result, setResult]   = useState('');

  const predict = async () => {
    if (!file) return alert('Please select a file first.');
    const form = new FormData();
    form.append('file', file);

    try {
      const { data } = await axios.post(
        'http://localhost:5000/predict',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' }}
      );
      setResult(data.result);
      setChart(data.chartData);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Check console.');
    }
  };

  return (
    <div className="App">
      <h1>EEG TBI Classifier</h1>

      <FileUploader onFileSelect={setFile} />

      <div className="controls">
        <button className="predict-btn" onClick={predict}>
          Predict
        </button>
        <ResultBadge result={result} />
      </div>

      <EEGChart data={chartData} />
    </div>
  );
}

export default App;
