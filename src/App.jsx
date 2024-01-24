import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAllUserQuery } from "./redux/api/baseApi";

function App() {
  const { data, isLoading } = useAllUserQuery();
  if (isLoading) {
    return <p>loding....</p>;
  }
  console.log(data);

  console.log(data);
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
