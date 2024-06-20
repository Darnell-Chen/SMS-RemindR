import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "./UserProfile";
import FamilyBoard from "./FamilyBoard";
import "../css/Dashboard/Dashboard.css";

function Dashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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

        if (!response.ok) {
            console.log("response not ok");
            throw new Error('Network response was not ok');

        } else {
            console.log(response);
            return response.json();
        }
    }

    useEffect(() => {
        if (localStorage.getItem("authToken") == null) {
            navigate("/");
        } else {
            const fetchData = async () => {
                try {
                    const result = await getData();
                    setData(result);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false); // Set loading to false once data is fetched
                }
            }
            fetchData();
        }
    }, []);  // we'll have an empty conditional render - so it only renders on initial load for now

    // this will return first if it's loading, the we'll skip this when useState sets isLoading to false
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="Dashboard-Div row">
                <div className="Dashboard-Containers col-sm-4">
                    <UserCard cardData={data} cardNav={navigate}/>
                </div>
                <div className="Dashboard-Containers col-sm-8">
                    <FamilyBoard cardData={data}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
