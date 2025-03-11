import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import { DoorOpen, Lightbulb, Fan } from "lucide-react";
import { Loading } from "../components/Loading";

const Rooms = () => {
  const backendUrl = "/rooms.json";

  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(backendUrl);
        setRooms(response.data);
        setFilteredRooms(response.data); // Initialize filteredRooms with all rooms
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomSelection = (room) => setSelectedRoom(room);

  // Search functionality
  useEffect(() => {
    const filtered = rooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [searchTerm, rooms]);

  return (
    <>
      <Loading isLoading={loading} />
      <div className="p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-purple-700"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <Card
                key={room.id}
                onClick={() => handleRoomSelection(room)}
                className={`p-4 cursor-pointer text-purple-700 ${
                  selectedRoom?.id === room.id ? "border-purple-700" : ""
                }`}
              >
                <CardContent className="flex flex-col items-center">
                  {room.type === "Living Room" && (
                    <DoorOpen size={40} className="text-purple-700" />
                  )}
                  {room.type === "Bedroom" && (
                    <Lightbulb size={40} className="text-purple-700" />
                  )}
                  {room.type === "Kitchen" && (
                    <Fan size={40} className="text-purple-700" />
                  )}
                  <h3 className="mt-2 font-semibold text-lg">{room.name}</h3>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-3 text-purple-700">
              No rooms found.
            </p>
          )}
        </div>

        {selectedRoom && (
          <div className="mt-6 p-4 border-t">
            <h2 className="text-xl font-bold text-purple-700">
              Selected Room: {selectedRoom.name}
            </h2>
            <p className="text-gray-600 text-purple-700">
              Type: {selectedRoom.type}
            </p>
            <Button
              className="mt-4 text-purple-700 border border-purple-700"
              onClick={() => setSelectedRoom(null)}
            >
              Clear Selection
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Rooms;
