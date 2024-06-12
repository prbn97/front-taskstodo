import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="Container">

      <div className="row">
        <Header />
      </div>

      <div className="row justify-content-left">

        <div className="col-1">
          <nav>
            <div className="list-group">
              <a href="#!" className="list-group-item list-group-item-action">Home</a>
              <a href="#!" className="list-group-item list-group-item-action">Movies</a>
            </div>
          </nav>
        </div>


        <div className="col">
          <Home />
        </div>

      </div>


    </div >
  );
}

export default App;

