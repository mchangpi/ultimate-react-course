import "./App.css";
import { skillList } from "./skill-data";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Avatar />
        <div className="data">
          <Intro />
          <SkillList />
        </div>
      </div>
    </>
  );
}

function Avatar() {
  return (
    <>
      <img
        className="avatar"
        src={"milton-selfie.jpg"}
        alt="Milton Chang"
      ></img>
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
      {skillList.map((skill) => (
        <Skill
          key={skill.skill}
          skill={skill.skill}
          bgColor={skill.color}
          level={skill.level}
        />
      ))}
      {/* <Skill skill="React" emoji="💪" bgColor="orangered" /> */}
      {/* <Skill skill="CSS3" emoji="💪" bgColor="cyan" /> */}
      {/* <Skill skill="Javascript" emoji="💪" bgColor="yellow" /> */}
    </div>
  );
}

function Skill({ skill, bgColor, level }) {
  console.log(skill, bgColor, level);
  return (
    <div className="skill" style={{ backgroundColor: bgColor }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}

export default App;
