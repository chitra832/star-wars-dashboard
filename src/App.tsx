import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Global Layout (Navbar, Sidebar, Footer, etc.) */}
      <Outlet /> {/* Renders child routes dynamically */}
    </div>
  );
}

export default App;
