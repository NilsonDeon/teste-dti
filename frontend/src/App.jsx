import Header from "./components/Header"
import InputForm from "./components/InputForm";
import Response from "./components/Response";

function App() {
  return (
    <>
      <Header />
      <div id="wrapper">
        <InputForm />
        <Response />
      </div>
    </>
  );
}

export default App;
