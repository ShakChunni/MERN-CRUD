import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faInfoCircle,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
  const [modalType, setModalType] = useState("");
  const [newProfession, setNewProfession] = useState("");
  const [newInterests, setNewInterests] = useState([]);
  const [newBio, setNewBio] = useState("");
  const [bioLength, setBioLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get("https://mern-crud-backend-kohl.vercel.app/userinfo", {
        params: { username },
      })
      .then((response) => {
        setUserInfo(response.data);
        if (newProfession !== response.data.profession) {
          setNewInterests([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newProfession]);

  const handleUpdate = () => {
    const username = localStorage.getItem("username");
    const updateData =
      modalType === "profession"
        ? { profession: newProfession, interests: newInterests }
        : { bio: newBio };

    axios
      .post("https://mern-crud-backend-kohl.vercel.app/updateinfo", {
        username,
        ...updateData,
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
    const deleteData =
      modalType === "profession"
        ? { profession: "", interests: [] }
        : { bio: "" };

    axios
      .post("https://mern-crud-backend-kohl.vercel.app/updateinfo", {
        username,
        ...deleteData,
      })
      .then((response) => {
        setUserInfo(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const openModal = (type) => {
    setModalType(type);
    if (type === "profession") {
      setNewProfession(userInfo.profession);
      setNewInterests(userInfo.interests);
    } else {
      setNewBio(userInfo.bio);
      setBioLength(userInfo.bio.length);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </button>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome, {userInfo.username}!
          </h2>
        </div>
        <div className="flex space-x-4">
          <div
            onClick={() => openModal("profession")}
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
            <p className="text-gray-600 font-bold">{userInfo.profession}</p>
            <ul className="list-disc list-inside text-gray-600">
              {userInfo.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div
            onClick={() => openModal("bio")}
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {modalType === "profession"
                  ? "Edit Profession and Interests"
                  : "Edit Bio"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {modalType === "profession" && (
              <>
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
                    <div className="flex flex-wrap">
                      {professionOptions[newProfession].map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center mr-4 mb-2"
                        >
                          <input
                            type="checkbox"
                            id={interest}
                            value={interest}
                            checked={newInterests.includes(interest)}
                            onChange={(e) => {
                              const selectedInterest = e.target.value;
                              setNewInterests((prevInterests) =>
                                prevInterests.includes(selectedInterest)
                                  ? prevInterests.filter(
                                      (i) => i !== selectedInterest
                                    )
                                  : [...prevInterests, selectedInterest]
                              );
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={interest} className="text-gray-700">
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {modalType === "bio" && (
              <div className="mb-4">
                <label htmlFor="bio" className="block text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={newBio}
                  onChange={(e) => {
                    setNewBio(e.target.value);
                    setBioLength(e.target.value.length);
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="50"
                ></textarea>
                <div className="text-right text-gray-600">{bioLength}/50</div>
              </div>
            )}

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
