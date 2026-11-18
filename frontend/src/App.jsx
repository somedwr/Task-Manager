import { useEffect, useState } from "react";
import { apiRequest } from "./api/client";

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    apiRequest("/health")
      .then((data) => setStatus(data.status))
      .catch((error) => setStatus(`error: ${error.message}`));
  }, []);

  return <h1>API status: {status}</h1>;
}

export default App;