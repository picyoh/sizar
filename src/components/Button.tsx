import { ReactNode, RefObject } from "react";
//import useButtonStore from "@/store/buttonStore";

export default function Button({
  title,
  icon,
  ref,
}: {
  title: string;
  icon: ReactNode;
  ref: RefObject<HTMLButtonElement | null>;
}) {
  //TODO: link to store
/*   const buttonState = useButtonStore((state)=> state.buttonState)
  const setButtonState = useButtonStore((state) => state.setButtonState); */
  let buttonState: string[] = [];
  const setButtonState = (arr: string[])=> {
    buttonState = arr;
  }
  const buttonAction = (title: string) => {
    const copy = buttonState.slice();
    copy.push(title)
    const compare = new Set(copy).size !== copy.length;
    if(compare){
      const index = copy.indexOf(title);
      const newArray = copy.splice(index)
      setButtonState(newArray)
    }

  }

  return (
    <>
      <button
        title={title}
        ref={ref}
        onClick={()=> buttonAction(title)}
        className="flex p-4 border-2 border-solid"
      >
        {icon}
      </button>
    </>
  );
}