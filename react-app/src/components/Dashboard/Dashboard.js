import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "./UserProfile";

function Dashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    // generally, it's advised to store refreshToken in http-only cookie, but this is just for a small project
    const authToken = localStorage.getItem("authToken");

    const getData = async () => {
        const response = await fetch('http://127.0.0.1:3001/getData', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',  // Optional for GET requests
              'Accept': 'application/json'
            }
        });

        console.log(response);

        if (!response.ok) {
            console.log("response not ok");
            throw new Error('Network response was not ok');

        } else {
            console.log(response);
            return response.json();
        }
    }

    useEffect(() => {
        if (localStorage.getItem("authToken") == null && localStorage.getItem("refreshToken") == null) {
            navigate("/");
        } else {
            const fetchData = async () => {
                const result = await getData();
                setData(result);
            }
            fetchData();
        }
    }, [])  // using an empty use dependency so that it only runs on the initial render



    return (
        <>
            <UserCard cardData={data} cardNav={navigate}/>
        </>
    )
}

export default Dashboard;