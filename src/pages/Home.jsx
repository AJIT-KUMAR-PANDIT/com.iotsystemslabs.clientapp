// Home Component
import { Plus } from "lucide-react";
import { CardSwitch } from "../components/CardSwitch";
import { useState } from "react";

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
      <div className="mt-4 grid grid-cols-2 gap-4">
        <CardSwitch
          title="Smart TV"
          devices="1"
          active={true}
          button={true}
          icon={<Plus />}
          handleToggle={handleToggleCardSwitch}
        />
      </div>
    </>
  );
}

export default Home;
