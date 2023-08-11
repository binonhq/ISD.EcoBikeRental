import { useState, useEffect } from "react";
export default function Time(startTime) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(startTime) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(startTime), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <h1>
        {days}:{hours}:{minutes}:{seconds}
      </h1>
    </div>
  );
}
