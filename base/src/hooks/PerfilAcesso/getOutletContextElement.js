import { useState } from "react";
import { Outlet } from "react-router";

const getOutletContextElement = () => {
  const OutletContextElement = () => {
    const [state, setState] = useState({});
    return (
      <>
        <Outlet context={[state, setState]} />
      </>
    );
  };

  return OutletContextElement;
}

export default getOutletContextElement;
