import React from "react";
import { League } from "./league";
import { Tournament } from "./tournament";
import { useLocation } from 'react-router-dom';


export const Event = () => {
  const location = useLocation();
  const { type, id } = location.state || {}; // default to empty object if state is not found

  const renderUpdater = () => {
    switch (type) {
      case "0":
        return <Tournament id={id}/>;
      case "1":
        return <League id={id} type={type}/>;
      default:
        return <div>Invalid type</div>; // Handle the default case
    }
  };

  return <>{renderUpdater()}</>; // Ensure the result is rendered as JSX
};
