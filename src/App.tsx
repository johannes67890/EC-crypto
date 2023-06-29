import './App.css'
import Canvas from './components/canvas'

function App() {
  
  return (
    <>
      <Canvas height={300} width={300} gridSize={25} x_dis_gridlines={5} y_dis_gridlines={5} x_start={{val: 1, suffix: ''}} y_start={{val:1, suffix: ''}}  />
    </>
  )
}

export default App
