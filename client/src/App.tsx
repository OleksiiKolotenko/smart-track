import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LeftBar from "./components/LeftBar/LeftBar";
import Alerts from "./components/Alerts/Alerts";
import Sequence from "./components/Sequence/Sequence";
import Dashboard from "./components/Dashboard/Dashboard";
import Stuff from "./components/Stuff/Stuff";
import "./app.scss";

function App() {
  const [activeBtn, setActiveBtn] = useState<number | null>(0);
  const [activePerson, setActivePerson] = useState<number>(0);
  return (
    <Router>
      <div className="app">
        <LeftBar activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/stuff">
          <Stuff
            activePerson={activePerson}
            setActivePerson={setActivePerson}
          />
        </Route>
        <Route path="/alerts">
          <Alerts />
        </Route>
        <Route path="/sequence">
          <Sequence />
        </Route>
      </div>
    </Router>
  );
}

export default App;
