// Home Component
import { Plus, Tv, Lightbulb, Fan } from "lucide-react";
import { CardSwitch } from "../components/CardSwitch";
import { useState } from "react";

const devicesData = [
  { title: "Smart TV", active: true,connected: true, icon: <Tv /> },
  { title: "Living Room Light", active: false,connected: false, icon: <Lightbulb /> },
  { title: "Ceiling Fan",  active: true,connected: true, icon: <Fan /> },
];

function Home() {
  const [colorEnable, setColorEnable] = useState(true);

  function handleToggleCardSwitch() {
    setColorEnable((prev) => !prev);
  }

  return (
    <>
      <div className="flex justify-between font-extrabold">
        <div className="text-[#7000A6] text-4xl">My Home</div>
        <div className="bg-[#7000A6] rounded-full w-[41px] h-[41px] flex justify-center items-center text-blue-50">
          <Plus />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 ">
        {devicesData.map((device, index) => (
          <CardSwitch
            key={index}
            title={device.title}
            active={device.active}
            connected={device.connected}
            button={true}
            icon={device.icon}
            handleToggle={handleToggleCardSwitch}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
