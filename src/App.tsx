import { PathfindingProvider } from "./context/PathfindingContext";

function App() {
  return (
    <>
      <PathfindingProvider>
        <div>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
      </PathfindingProvider>
    </>
  );
}

export default App;
