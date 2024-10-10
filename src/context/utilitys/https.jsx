import axios from 'axios';

class https {
  constructor(url) {
    this.url = url;
    this.loading = false;
    this.error = null;
    this.data = null;
    this.config = { 
      withCredentials: true,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json" 
      }
    };
  } 
  async get(queryString) {
    this.loading = true;
    try {
      const response = await axios.get(`${this.url}/${queryString}`, this.config);
      // Check if the response has a status indicating success
      // console.log(response.data); 

      if (response.data.status) {
        return { status: true, data: response.data }; // Directly return the object
      } else {
        return Promise.reject({ status: false, data: response?.data?.ms }); // Reject with an error object
      }
    } catch (error) {
      return Promise.reject({ status: false, data: 'An error occurred during the POST request with credentials: ' + error.message });
    } finally {
      this.loading = false;
    }
  }  
  async post(action, dataToSend) {
    this.loading = true;
    try {
      const response = await axios.post(`${this.url}/${action}`, dataToSend, this.config); 
      // Check if the response has a status indicating success
      // console.log(response.data); 

      if (response.data.status) {
        return { status: true, data: response.data }; // Directly return the object
      } else {
        return Promise.reject({ status: false, data: response?.data?.ms }); // Reject with an error object
      }
    } catch (error) {
      return Promise.reject({ status: false, data: 'An error occurred during the POST request with credentials: ' + error.message });
    } finally {
      this.loading = false;
    }
  }
  
 
}

export default https;