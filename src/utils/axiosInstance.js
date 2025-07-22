import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json", 
  },  
});

export default axiosInstance;




// import axios from "axios";
// const API_BASE_URL =
//   import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// const DataService = (token) => {
//   return axios.create({
//     baseURL: API_BASE_URL, // your backend base URL
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export default DataService;
