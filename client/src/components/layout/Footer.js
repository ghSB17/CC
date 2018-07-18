import React from "react";
import Github from "./Github.svg";
import LinkedIn from "./LinkedIn.svg";


const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 p-2 text-center">
      Copyright &copy; {new Date().getFullYear()} Developed By:
      <br />

      <div className="row pt-2">

        <div className="col-md-4 col-sm-12">
          <div class="card bg-dark text-white">
            <div class="card-header">
              <h5>Sumathi Ganjam</h5>
            </div>
            <div class="card-body py-0">
              <ul class="list-inline">
                <li class="list-inline-item">
                  <a target="_blank" href="https://github.com/ghSB17">
                    <img src={Github} className="App-logo" alt="Github" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a target="_blank" href="https://www.linkedin.com/in/sumathiganjam/">
                    <img src={LinkedIn} className="App-logo" alt="LinkedIn" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div class="card bg-dark text-white">
            <div class="card-header">
              <h5>Efrat Rosmarin</h5>
            </div>
            <div class="card-body  py-0">
              <ul class="list-inline text-center">
                <li class="list-inline-item px-0">
                  <a target="_blank" href="https://github.com/efratrosmarin">
                    <img src={Github} className="App-logo" alt="Github" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
                <li class="list-inline-item px-0 mx-0">
                  <a target="_blank" href="https://www.linkedin.com/in/talefrat/">
                    <img src={LinkedIn} className="App-logo" alt="LinkedIn" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="col-md-4 col-sm-12">
          <div class="card bg-dark text-white">
            <div class="card-header">
              <h5>Joyce Santos</h5>
            </div>
            <div class="card-body  py-0">
              <ul class="list-inline text-center">
                <li class="list-inline-item">
                  <a target="_blank" href="https://github.com/puppitty">
                    <img src={Github} className="App-logo" alt="Github" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a target="_blank" href="https://www.linkedin.com/in/joyce-santos-363b084/">
                    <img src={LinkedIn} className="App-logo" alt="LinkedIn" style={{ height: "40px", width: "40px" }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </footer >
  );
};

export default Footer