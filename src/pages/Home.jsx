
import { Plus, Tv, Lightbulb, Fan } from "lucide-react";
import { CardSwitch } from "../components/CardSwitch";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [devicesTopData, setDevicesTopData] = useState([]);
  const [devicesSceenData, setDevicesSceenData] = useState([]);
  const [devicesFrequentlyData, setDevicesFrequentlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   const backendUrl = import.meta.env.BACKENDURL;

  const backendUrl = "/api.json";

  useEffect(() => {
    async function fetchData() {
      try {
        const [topResponse, scenesResponse, frequentResponse] = await Promise.all([
          axios.get(`${backendUrl}`),
          axios.get(`${backendUrl}`),
          axios.get(`${backendUrl}`)
        ]);

        console.log("Top Data:", topResponse.data);
        console.log("Scenes Data:", scenesResponse.data);
        console.log("Frequent Data:", frequentResponse.data);

        setDevicesTopData(Array.isArray(topResponse.data) ? topResponse.data : []);
        setDevicesSceenData(Array.isArray(scenesResponse.data) ? scenesResponse.data : []);
        setDevicesFrequentlyData(Array.isArray(frequentResponse.data) ? frequentResponse.data : []);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const [colorEnable, setColorEnable] = useState(true);

  // Send toggle request to backend
  async function handleToggleCardSwitch(device) {
    const toggleState = device.active ? "off" : "on";
    try {
      await axios.get(`${backendUrl}/${device.devices}/${toggleState}`);
      setDevicesTopData((prevData) =>
        prevData.map((d) =>
          d.devices === device.devices ? { ...d, active: !d.active } : d
        )
      );
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  }

  // Helper function to render icons
  const renderIcon = (icon) => {
    const iconsMap = {
      "Tv": <Tv />,
      "Lightbulb": <Lightbulb />,
      "Fan": <Fan />
    };
    return iconsMap[icon] || <Plus />; // Default icon if no match
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="pt-21 flex justify-between font-extrabold">
        <div className="text-[#7000A6] text-4xl">My Home</div>
        <div className="bg-[#7000A6] rounded-full w-[41px] h-[41px] flex justify-center items-center text-blue-50">
          <Plus />
        </div>
      </div>

      {/* Favorite Section */}
      <div className="pt-4 text-[#7000A6] text-4xl font-extrabold">Favorite</div>
      <div
        id="top"
        className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide"
        style={{
          whiteSpace: "nowrap",
          maxWidth: "100vw",
        }}
      >
        {Array.isArray(devicesTopData) && devicesTopData.map((device, index) => (
          <div
            key={index}
            className="min-w-[150px] snap-start"
            style={{ flex: "0 0 auto" }}
          >
            <CardSwitch
              title={device.title}
              devices={device.devices}
              active={device.active}
              connected={device.connected}
              button={true}
              icon={renderIcon(device.icon)}
              handleToggle={() => handleToggleCardSwitch(device)}
            />
          </div>
        ))}
      </div>

      {/* Scenes Section */}
      <div className="pt-4 text-[#7000A6] text-4xl font-extrabold">Scenes</div>
      <div className="mt-4 grid grid-cols-1 gap-4 ">
        {Array.isArray(devicesSceenData) && devicesSceenData.map((device, index) => (
          <CardSwitch
            key={index}
            title={device.title}
            devices={device.devices}
            active={device.active}
            connected={device.connected}
            button={true}
            icon={renderIcon(device.icon)}
            handleToggle={() => handleToggleCardSwitch(device)}
          />
        ))}
      </div>

      {/* Frequent Section */}
      <div className="pt-4 text-[#7000A6] text-4xl font-extrabold">Frequent</div>
      <div className="mt-4 grid grid-cols-2 gap-4 ">
        {Array.isArray(devicesFrequentlyData) && devicesFrequentlyData.map((device, index) => (
          <CardSwitch
            key={index}
            title={device.title}
            devices={device.devices}
            active={device.active}
            connected={device.connected}
            button={true}
            icon={renderIcon(device.icon)}
            handleToggle={() => handleToggleCardSwitch(device)}
          />
        ))}
      </div>
    </>
  );
}

export default Home;