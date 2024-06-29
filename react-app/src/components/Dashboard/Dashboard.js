import { useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import UserCard from "./UserProfile";
import FamilyBoard from "./FamilyBoard";
import "../css/Dashboard/Dashboard.css";
import { addCard, removeCard } from "./UpdateDashFuncs";

// the context we will use to re-render/fetch from any child component
const DataContext = createContext();

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
            navigate("/");

        } else {
            const fetchResponse = await response.json();
            return fetchResponse;
        }
    }

    useEffect(() => {
        if (localStorage.getItem("authToken") == null) {
            navigate("/");
        } else {
            const fetchData = async () => {
                try {
                    const result = await getData();
                    const userInfo = await result.userInfo; // Ensure result.userInfo is fetched correctly
                    setData(userInfo);
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

    const fetchNewData = async (type, info) => {
        if (type === "add") {
            // info here is the form data / message we're adding
            const newData = await addCard(data, info);
            await setData(newData);


        } else if (type === "remove") {
            // info here is the title of the message we're removing
            const newData = await removeCard(data, info);
            await setData(newData);
        }

        // const result = await getData();
        // const userInfo = await result.userInfo; // Ensure result.userInfo is fetched correctly
        // setData(userInfo);
    }

    return (
        <DataContext.Provider value={fetchNewData}>
            <div className="Dashboard-Div col">
                <div className="Dashboard-Containers row-1">
                    <UserCard cardData={data} cardNav={navigate}/>
                </div>
                <div className="Dashboard-Containers row-10">
                    <FamilyBoard cardData={data}/>
                </div>
            </div>
        </DataContext.Provider>
    )
}

export default Dashboard;
export { DataContext };
