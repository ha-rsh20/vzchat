import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import RoomPage from "./pages/room";
import Lobby from "./pages/home/Lobby";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Protected from "./pages/Protected";
import History from "./pages/History";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Footer from "./pages/Footer";
import NavBar from "./pages/NavBar";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Protected Component={Lobby} />} />
          <Route path="/history" element={<Protected Component={History} />} />
          <Route path="/chat" element={<Protected Component={Chat} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Register login="true" />} />
          <Route
            path="/room/:roomId"
            element={<Protected Component={RoomPage} />}
          />
          <Route
            path="/updateprofile"
            element={<Protected Component={UpdateProfile} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
