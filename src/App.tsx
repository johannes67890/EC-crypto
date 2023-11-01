import "./App.css";
import Canvas from "./components/canvas";

const equation = (x: number) => x**2;

function App() {
  return (
    <>
      <Canvas
        func={equation}
        height={500}
        width={500}
        options={{
          gridSize: 15,
          x_dis_gridlines: 7,
          y_dis_gridlines: 7,
          x_start: { val: 1, suffix: "" },
          y_start: { val: 1, suffix: "" },
          stroke: 1,
          textSize: 12,
        }}
      />
    </>
  );
}

export default App;
