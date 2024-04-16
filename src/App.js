import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import Home from './components/home';
import Lock from './components/Lock';


function App() {
  return (
<>
  <Lock />
  <Home />
</>
  );
}

export default App;
