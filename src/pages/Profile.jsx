import React, { useState } from "react";
import { User, Mail, Edit, LogOut } from "lucide-react";

function Profile({ isBlackBg }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "https://via.placeholder.com/150" // Sample Profile Image
  });

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add logout logic here
  };

  return (
    <div className={`p-4 rounded-xl shadow-md ${isBlackBg ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}>
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileData.profileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-purple-500"
        />
        <div>
          <h2 className="text-xl font-bold">{profileData.name}</h2>
          <p className="text-sm text-gray-400">{profileData.email}</p>
        </div>
      </div>

      {/* Editable Fields */}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleEdit}
            className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <User size={20} /> <span>{profileData.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={20} /> <span>{profileData.email}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Edit size={18} /> Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
