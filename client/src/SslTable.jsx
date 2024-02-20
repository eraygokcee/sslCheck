import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
 
  try {
    const response = await axios.get('http://localhost:5002/api/ssl/', { withCredentials: true });
    setData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const handleUrlInputChange = (event) => {
  setUrlInput(event.target.value);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:5002/api/ssl/create', { url: urlInput }, { withCredentials: true });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error submitting URL:', error);
  }
};


  return (
    <div>
    <h1>SSL Table</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="urlInput">URL:</label>
      <input type="text" id="urlInput" value={urlInput} onChange={handleUrlInputChange} />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>URL</th>
          <th>Days Remaining</th>
          <th>Valid From</th>
          <th>Valid To</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.url}</td>
            <td>{row.daysremaining}</td>
            <td>{row.validfrom}</td>
            <td>{row.validto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default TableComponent;
