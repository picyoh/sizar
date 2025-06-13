import { useEffect, useRef, useState } from "react";
import { TbHexagon3D, TbCube3dSphere, TbHandFinger } from "react-icons/tb";
import { imageProcessing } from "../lib/imageProcessing";
import useButtonStore from "../store/outputStore";
import useVideoStore from "../store/inputStore";

export default function Panel() {
  // Get modes params from store
  const modes = useButtonStore((state) => state.modes);
  const setButtonState = useButtonStore((state) => state.setModes);

  // Trigger Actions on click
  function buttonAction(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    if (modes.includes(id))
      setButtonState(modes.filter((element) => element !== id));
    else setButtonState([...modes, id]);
  }

  // Set style to buttons icons
  const iconClassName = "pointer-events-none";
  // Button description
  const content = [
    {
      id: "select",
      title: "Selectionner un objet",
      icon: <TbHandFinger className={iconClassName} />,
    },
    {
      id: "object",
      title: "Detection d'objets",
      icon: <TbHexagon3D className={iconClassName} />,
    },
    {
      id: "surface",
      title: "Detection de surfaces",
      icon: <TbCube3dSphere className={iconClassName} />,
    },
  ];

  return (
    <div className="flex justify-evenly items-center">
      {content.map((element) => {
        return (
          <button
            key={element.id}
            id={element.id}
            title={element.title}
            onClick={buttonAction}
            className="flex p-4 border-2 border-solid"
          >
            {element.icon}
          </button>
        );
      })}
    </div>
  );
}
