import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="Container">

      <div className="row">
        <Header />
      </div>

      <div className="row justify-content-center">

        <div className="col-6">
          <Outlet />
        </div>

      </div>

    </div >
  );
}

export default App;

