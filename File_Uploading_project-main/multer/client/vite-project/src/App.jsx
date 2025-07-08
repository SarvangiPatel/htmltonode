import { useState } from "react";
import Files from "./pages/Files";
import Uploadsfile from "./pages/Uploadsfile";
import "./App.css"


function App() {

  const [refresh, setRefresh] = useState(false);

  const handleUploadSuccess = () => {
    setRefresh(prev => !prev);
  }

  return (
    <>
      <Uploadsfile onUploadSuccess={handleUploadSuccess} />
      <br />
      <Files refresh={refresh} />
    </>
  );
}

export default App;
