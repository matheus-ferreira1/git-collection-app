import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes";

import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
