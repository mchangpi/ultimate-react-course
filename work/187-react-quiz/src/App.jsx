import "./App.css";
// import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="app">
      {/* <DateCounter></DateCounter> */}
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
