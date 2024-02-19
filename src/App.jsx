import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AllDevices from './pages/AllDevices';
import FormPage from './pages/FormPage';
import DeviceInformationPage from './pages/DeviceInformationPage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
          <div>
          <NavBar/>
            <Routes>
                <Route exact path="/" element={<AllDevices/>} />
                <Route path="/formpage" element={<FormPage/>} />
                <Route path="/deviceinfo" element={<DeviceInformationPage/>} />
            </Routes>
            </div>
        </Router>
  );
};

export default App;