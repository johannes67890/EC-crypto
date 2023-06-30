import "./App.css";
import Canvas from "./components/canvas";

function App() {
  return (
    <>
      <Canvas
        func={(x: number) => x ** 2}
        height={500}
        width={500}
        props={{
          gridSize: 25,
          x_dis_gridlines: 5,
          y_dis_gridlines: 5,
          x_start: { val: 1, suffix: "" },
          y_start: { val: 1, suffix: "" },
        }}
      />
    </>
  );
}

export default App;
