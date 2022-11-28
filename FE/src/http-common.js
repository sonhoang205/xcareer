import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
var token = "";
if (user && user.token) {
  token = user.token;
}

const http = axios.create({
  baseURL: "http://localhost:9090/api/",
  params: {
        userId: user._id
      },
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export default http;
// export default axios.create({
//   baseURL: "http://localhost:9090/api/", params: {
//     userId: user._id
//   },
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": `Bearer ${token}`,

//   },
// });
