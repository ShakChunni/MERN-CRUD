import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    profession: "",
    interests: [],
    bio: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/userinfo")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Profession</h2>
            <p>{userInfo.profession}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Interests</h2>
            <ul>
              {userInfo.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Bio</h2>
            <p>{userInfo.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
