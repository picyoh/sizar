import { TbHexagon3D, TbCube3dSphere, TbHandFinger } from "react-icons/tb";
import useOutputStore from "../store/outputStore";

export default function Panel() {
  // Get modes params from store
  const modes = useOutputStore((state) => state.modes);
  const setModes = useOutputStore((state) => state.setModes);
  
  // Trigger Actions on click
  function buttonAction(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    setModes(id);
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
