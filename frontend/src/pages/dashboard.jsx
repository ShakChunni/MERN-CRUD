import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faHeart,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const professionOptions = {
  "Marketing Professional": [
    "Growth marketing",
    "Digital Marketing",
    "Product Marketing",
    "Paid marketing",
    "Organic marketing",
  ],
  Entrepreneur: [
    "Startup enthusiast",
    "SME",
    "Product enthusiast",
    "Product Leader",
    "Product owner",
  ],
  "Content Creator": ["Youtube", "Twitch", "Twitter", "Video Content"],
};

function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    profession: "",
    interests: [],
    bio: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfession, setNewProfession] = useState("");
  const [newInterests, setNewInterests] = useState([]);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get("http://localhost:5000/userinfo", {
        params: { username },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = () => {
    const username = localStorage.getItem("username");
    axios
      .post("http://localhost:5000/updateinfo", {
        username,
        profession: newProfession,
        interests: newInterests,
        bio: newBio,
      })
      .then((response) => {
        setUserInfo(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    const username = localStorage.getItem("username");
    axios
      .post("http://localhost:5000/deleteinfo", {
        username,
      })
      .then(() => {
        setUserInfo({ ...userInfo, profession: "", interests: [], bio: "" });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Dashboard
        </h1>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome, {userInfo.username}!
          </h2>
        </div>
        <div className="flex space-x-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-1 border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-blue-500 mr-2"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                Profession
              </h2>
            </div>
            <p className="text-gray-600">{userInfo.profession}</p>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-1 border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faHeart} className="text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Interests</h2>
            </div>
            <ul className="list-disc list-inside text-gray-600">
              {userInfo.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex-1 border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-blue-500 mr-2"
              />
              <h2 className="text-lg font-semibold text-gray-700">Bio</h2>
            </div>
            <p className="text-gray-600">{userInfo.bio}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Edit Information
            </h2>
            <div className="mb-4">
              <label htmlFor="profession" className="block text-gray-700">
                Profession
              </label>
              <select
                id="profession"
                value={newProfession}
                onChange={(e) => setNewProfession(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Profession</option>
                {Object.keys(professionOptions).map((profession) => (
                  <option key={profession} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>
            {newProfession && (
              <div className="mb-4">
                <label htmlFor="interests" className="block text-gray-700">
                  Interests
                </label>
                <select
                  id="interests"
                  multiple
                  value={newInterests}
                  onChange={(e) =>
                    setNewInterests(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {professionOptions[newProfession].map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength="50"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
