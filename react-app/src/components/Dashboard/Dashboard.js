import { useNavigate, useEffect } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    // generally, it's advised to store refreshToken in http-only cookie, but this is just for a small project
    const authToken = localStorage.getItem("authToken");

    getData = async () => {
        const response = await fetch('http://127.0.0.1:3001/getData', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',  // Optional for GET requests
              'Accept': 'application/json'
            }
          });
    }

    if (localStorage.getItem("authToken") == null && localStorage.getItem("refreshToken") == null) {
        navigate("/");
    } else {
        getData();
    }
}

export default Dashboard;