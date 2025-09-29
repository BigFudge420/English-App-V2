import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Folders from "./components/folders.jsx";
import Home from "./components/home.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders/:folderId" element={<Folders />} />
      </Routes>
    </Router>
  );
}