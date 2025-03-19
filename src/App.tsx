import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import Main from './components/pages/Main';
import DateAndTime from './components/pages/DateAndTime';
import OfficeSelector from './components/pages/OfficeSelector';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/date" element={<DateAndTime />} />
          <Route path="/office" element={<OfficeSelector />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
