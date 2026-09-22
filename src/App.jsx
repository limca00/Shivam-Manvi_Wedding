import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Invitation from './pages/Invitation';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Add your page Route elements here */}
                <Route path="/" element={<Invitation />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    )
}

export default App