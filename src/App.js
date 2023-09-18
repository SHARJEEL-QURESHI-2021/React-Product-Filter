import './App.css';
import Navbar from './Components/NAvbar';
import MainBar from './Components/MainBar';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-container">
        <MainBar />
      </div>
    </div>
  );
}

export default App;
