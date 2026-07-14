import ResultDetails from "../components/ResultDetails.tsx";
import TestResult from "../components/TestResult.tsx";
import Header from "../UI/Header.tsx";
import {useLocation} from 'react-router-dom';

const ResultsPage = () => {
    const { state } = useLocation();
    const { score, totalQuestions, answers, questions } = state;

    return (
        <>
            <Header/>

            <TestResult
                score={score}
                totalQuestions={totalQuestions}
            />

            <ResultDetails
                score={score}
                totalQuestions={totalQuestions}
                answers={answers}
                questions={questions}
            />
        </>
    );
};

export default ResultsPage;