import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx"
import ContactsPage from "../pages/ContactsPage.tsx";
import VariantsPage from "../pages/VariantsPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import QuizPage from "../pages/QuizPage.tsx";
import ResultsPage from "../pages/ResultsPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/contacts" element={<ContactsPage/>} />
            <Route path="/variants" element={<VariantsPage/>} />
            <Route path="/quiz" element={<QuizPage/>} />
            <Route path="/results" element={<ResultsPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    )
}

export default App
