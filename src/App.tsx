import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import Main from './components/pages/Main';
import DateAndTime from './components/pages/DateAndTime';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/date" element={<DateAndTime />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
