import { Routes, Route, Link } from 'react-router-dom';
import Cards from './components/shared/Cards';
import './App.css';
import Layout from './components/shared/Layout';

const cardData = [
  { title: "Card 1", content: "This is the content for card 1." },
  { title: "Card 2", content: "This is the content for card 2." },
  { title: "Card 3", content: "This is the content for card 3." },
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
