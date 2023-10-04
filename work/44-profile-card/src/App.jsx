import { useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Avatar />
        <div className="data">
          <Intro />
          {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
          <SkillList />
        </div>
      </div>
    </>
  );
}

function Avatar() {
  return (
    <>
      <img className="avatar" src={"vite.svg"} alt="Milton Chang"></img>
    </>
  );
}
function Intro() {
  return (
    <>
      <h1>Milton Chang</h1>
      <p>I am looking for a position as React Front end engineer.</p>
    </>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="React" emoji="💪" bgColor="orangered" />
      <Skill skill="CSS3" emoji="💪" bgColor="cyan" />
      <Skill skill="Javascript" emoji="💪" bgColor="yellow" />
    </div>
  );
}

function Skill({ skill, bgColor, emoji }) {
  return (
    <div className="skill" style={{ backgroundColor: bgColor }}>
      <span>{skill}</span>
      <span>{emoji}</span>
    </div>
  );
}

export default App;
