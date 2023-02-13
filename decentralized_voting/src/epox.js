import React, { useState, useEffect } from "react";

function UnixEpochClock() {
  const [epochTime, setEpochTime] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setEpochTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <h1>Unix Epoch Clock: {epochTime}</h1>
      
    </div>
  );
}

export default UnixEpochClock;