/* eslint-disable react/jsx-pascal-case */
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout_IoT from './Layout/layout';
 import Control_IoT from './component/Lampu_IoT';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify bg-gray-100">
        <Routes>
          {/* <Switch> */}
            <Route path="/control-iot" element={<Layout_IoT />} />
            <Route path="/iot" element={<Control_IoT/>} />
          {/* </Switch> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}
