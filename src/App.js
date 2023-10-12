import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <div className="App">
        <h1>Event registration</h1>
        <RegistrationForm />
        <UserList />
      </div>
    </>
  );
}

export default App;
