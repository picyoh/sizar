import { useEffect, useRef } from "react";
import Button from "./Button";
import { TbHexagon3D, TbCube3dSphere } from "react-icons/tb";
import useButtonStore from "@/store/buttonStore";

export default function Panel() {
  // Get Object button reference
  const objectRef = useRef<HTMLButtonElement | null>(null);
  const setObjectRef = useButtonStore((state) => state.setObjectRef);

  // Get Surface button reference
  const surfaceRef = useRef<HTMLButtonElement | null>(null);
  const setSurfaceRef = useButtonStore((state) => state.setSurfaceRef);

  // Set style to buttons icons
  const iconClassName = "pointer-events-none";
  // Button description
  const content = [
    {
      id: "object",
      title: "Detection d'objets",
      icon: <TbHexagon3D className={iconClassName} />,
      ref: objectRef,
    },
    {
      id: "surface",
      title: "Detection de surfaces",
      icon: <TbCube3dSphere className={iconClassName} />,
      ref: surfaceRef,
    },
  ];

  useEffect(() => {
    setObjectRef(objectRef);
    setSurfaceRef(surfaceRef);
  }, [setObjectRef, setSurfaceRef]);

  return (
    <div className="flex justify-evenly items-center">
      {content.map((element) => {
        return (
          <Button
            key={element.id}
            id={element.id}
            title={element.title}
            icon={element.icon}
            ref={element.ref}
          />
        );
      })}
    </div>
  );
}
