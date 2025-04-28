"use client";

import React, { ReactNode, RefObject } from "react";
import useButtonStore from "@/store/buttonStore";

export default function Button({
  id,
  title,
  icon,
  ref,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  ref: RefObject<HTMLButtonElement | null>;
}) {
  const buttonState = useButtonStore((state) => state.buttonState);
  const setButtonState = useButtonStore((state) => state.setButtonState);

  function buttonAction(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    if (buttonState.includes(id))
      setButtonState(buttonState.filter((element) => element !== id));
    else setButtonState([...buttonState, id]);
  }
  console.log(buttonState);

  return (
    <>
      <button
        id={id}
        title={title}
        ref={ref}
        onClick={buttonAction}
        className="flex p-4 border-2 border-solid"
      >
        {icon}
      </button>
    </>
  );
}
