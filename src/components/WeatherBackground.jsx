import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import sunny from "../assets/Partly cloudy.json";
import cloudy from "../assets/Sky.json";
import rain from "../assets/Weerplaza.json";
import snow from "../assets/snow icon.json";
import fog from "../assets/Weather-mist.json";

const WeatherBackground = ({ description }) => {
  const [animation, setAnimation] = useState(sunny);

  useEffect(() => {
    const desc = description?.toLowerCase() || "";

    if (desc.includes("cloud")) setAnimation(cloudy);
    else if (desc.includes("rain")) setAnimation(rain);
    else if (desc.includes("snow")) setAnimation(snow);
    else if (desc.includes("fog") || desc.includes("haze") || desc.includes("mist") || desc.includes('smoke')) setAnimation(fog);
    else setAnimation(sunny); // default
  }, [description]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Lottie
        animationData={animation}
        loop
        className="w-full h-full object-cover scale-[1.5] opacity-60"
      />
    </div>
  );
};

export default WeatherBackground;
