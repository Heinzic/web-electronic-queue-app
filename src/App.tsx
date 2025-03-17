import { Routes, Route, Link } from 'react-router-dom';
import Cards from './components/shared/Cards';
import './App.css';
import Layout from './components/shared/Layout';

const cardData = [
  { title: "Дата и время"},
  { title: "Место"},
  { title: "Услуга"},
];
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Cards cards={cardData} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
