import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import Main from './components/pages/Main';
import DateAndTimeSelector from './components/pages/DateAndTimeSelector';
import OfficeSelector from './components/pages/OfficeSelector';
import ServiceSelector from './components/pages/ServiceSelector';
import UserInfoForm from './components/pages/UserInfoForm';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/date" element={<DateAndTimeSelector />} />
          <Route path="/office" element={<OfficeSelector />} />
          <Route path="/service" element={<ServiceSelector />} />
          <Route path="/userinfo" element={<UserInfoForm />} />

        </Routes>
      </Layout>
    </div>
  );
}

export default App;
