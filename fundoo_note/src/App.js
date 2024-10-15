import logo from './logo.svg';
import './App.css';
import Register from './Components/Register'
import Login from './Components/Login';
import RoutingModule from './RoutingModule';
import DashboardContainer from './Components/DashboardContainer';
import NotesContainer from './Components/NotesContainer';
import NoteCard from './Components/NoteCard';



function App() {
  return (
    <div className="App">
      {/* <NoteCard/> */}
      {/* <Register /> */}
      {/* <Login/> */}
      <RoutingModule/>
     {/* < DashboardContainer/> */}
     {/* <NotesContainer/> */}
     {/* <NoteCard/> */}
      
    </div>
  );
}

export default App;
