import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/Card';

const Usage = () => {
    const backendUrl = "/usage.json";

    const [usageData, setUsageData] = useState([]);
    const [filteredUsageData, setFilteredUsageData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsageData = async () => {
            try {
                const response = await axios.get(backendUrl);
                setUsageData(response.data);
                setFilteredUsageData(response.data); // Initialize filtered data
            } catch (err) {
                console.error("Error fetching usage data:", err);
                setError("Failed to load usage data. Please try again.");
            }
        };
        fetchUsageData();
    }, []);

    // Filter data based on search term
    useEffect(() => {
        const filteredData = usageData.filter((item) =>
            item.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.room.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsageData(filteredData);
    }, [searchTerm, usageData]);

    return (
        <div className="p-4">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <h2 className="text-xl font-bold text-purple-700 mb-4">Usage Statistics</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by device or room..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsageData.length > 0 ? (
                    filteredUsageData.map((item) => (
                        <Card key={item.id} className="p-4 text-purple-700">
                            <CardContent>
                                <h3 className="font-semibold text-lg">{item.deviceName}</h3>
                                <p className="text-sm">Room: {item.room}</p>
                                <p className="text-sm">Usage Hours: {item.usageHours} hrs</p>
                                <p className="text-sm">Power Consumption: {item.powerConsumption} kWh</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-purple-700">No matching data found.</p>
                )}
            </div>
        </div>
    );
};

export default Usage;
