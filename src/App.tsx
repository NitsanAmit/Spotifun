import React from 'react';
import './App.css';
import {InformationPanel} from "./info-panel";
import {AppButton} from "./app-button";

function App() {
  return (
    <div className="App">
      <InformationPanel/>
      <AppButton label={"Click Me!"} onButtonClick={(event => console.log("Clicked!"))}/>
    </div>
  );
}

export default App;
