import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton({
  handlerRunVisualizer,
  isDisabled,
  isGraphVisualized,
}: {
  isDisabled: boolean;
  isGraphVisualized: boolean;
  handlerRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={handlerRunVisualizer}
      className="focus:ring-opacity-30 rounded-full border-none bg-green-500 p-2.5 shadow-md transition ease-in hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none active:ring-green-300 disabled:pointer-events-none disabled:opacity-50"
    >
      {isGraphVisualized ? (
        <GrPowerReset className="h-5 w-5" />
      ) : (
        <BsFillPlayFill className="h-5 w-5" />
      )}
    </button>
  );
}
