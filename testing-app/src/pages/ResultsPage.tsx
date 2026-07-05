import ResultDetails from "../components/ResultDetails.tsx";
import TestResult from "../components/TestResult.tsx";
import Header from "../UI/Header.tsx";
import {useLocation, useNavigate} from 'react-router-dom';


const ResultsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <TestResult
                score={state.score}
                totalQuestions={state.totalQuestions}
                onRestartTest={() => navigate("/quiz")}
            />

            <ResultDetails
                score={state.score}
                totalQuestions={state.totalQuestions}
                answers={state.answers}
                questions={state.questions}
            />
        </>
    );
};

export default ResultsPage;