import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import { DoorOpen, Lightbulb, Fan } from "lucide-react";

const Rooms = () => {
  const backendUrl = "/rooms.json";

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${backendUrl}`);
        setRooms(response.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again.");
      }
    };
    fetchRooms();
  }, [backendUrl]);

  const handleRoomSelection = (room) => setSelectedRoom(room);

  return (
    <div className="p-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            onClick={() => handleRoomSelection(room)}
            className={`p-4 cursor-pointer ${
              selectedRoom?.id === room.id ? "border-blue-500" : ""
            }`}
          >
            <CardContent className="flex flex-col items-center">
              {room.type === "Living Room" && (
                <DoorOpen size={40} className="text-blue-400" />
              )}
              {room.type === "Bedroom" && (
                <Lightbulb size={40} className="text-yellow-400" />
              )}
              {room.type === "Kitchen" && (
                <Fan size={40} className="text-green-400" />
              )}
              <h3 className="mt-2 font-semibold text-lg">{room.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRoom && (
        <div className="mt-6 p-4 border-t">
          <h2 className="text-xl font-bold">
            Selected Room: {selectedRoom.name}
          </h2>
          <p className="text-gray-600">Type: {selectedRoom.type}</p>
          <Button className="mt-4" onClick={() => setSelectedRoom(null)}>
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default Rooms;
