import { RefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { PlayButton } from "./PlayButton";
// import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
// import { animatePath } from "../utils/animatePath";

export function Nav({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = (maze: MazeType) => {
    setMaze(maze);
    resetGrid({ grid, startTile, endTile });
    if (maze === "NONE") return;

    setIsDisabled(true);
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed,
    });
    const newGrid = [...grid]; // create shallow copy to invoke re-render via setGrid
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  // const handlerRunVisualizer = () => {
  //   if (isGraphVisualized) {
  //     setIsGraphVisualized(false);
  //     resetGrid({ grid: grid.slice(), startTile, endTile });
  //     return;
  //   }

  //   const { traversedTiles, path } = runPathfindingAlgorithm({
  //     algorithm,
  //     grid,
  //     startTile,
  //     endTile,
  //   });

  //   animatePath(traversedTiles, path, startTile, endTile, speed);
  //   setIsDisabled(true);
  //   isVisualizationRunningRef.current = true;
  //   setTimeout(
  //     () => {
  //       const newGrid = grid.slice();
  //       setGrid(newGrid);
  //       setIsGraphVisualized(true);
  //       setIsDisabled(false);
  //       isVisualizationRunningRef.current = false;
  //     },
  //     SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
  //       EXTENDED_SLEEP_TIME *
  //         (path.length + 60) *
  //         SPEEDS.find((s) => s.value === speed)!.value,
  //   );
  // };

  return (
    <div className="flex min-h-[4.5rem] items-center justify-center border-b px-0 shadow-gray-600 sm:px-5">
      <div className="flex w-full items-center justify-center sm:w-[52rem] lg:justify-between">
        <h1 className="hidden w-[40%] pl-1 text-2xl lg:flex">
          Pathfinding Visualizer
        </h1>

        <div className="flex flex-col items-center justify-start space-y-3 py-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0 sm:space-x-4 sm:py-0">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            isDisabled={isDisabled}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            label="Graph"
            value={algorithm}
            isDisabled={isDisabled}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            isDisabled={isDisabled}
            onChange={(e) => {
              setSpeed(parseInt(e.target.value) as SpeedType);
            }}
          />
          {/* <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
          /> */}
        </div>
      </div>
    </div>
  );
}
