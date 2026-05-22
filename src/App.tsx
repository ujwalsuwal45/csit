import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { SemesterPage } from './pages/SemesterPage';
import { SubjectPage } from './pages/SubjectPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { MCQListPage } from './pages/MCQListPage';
import { MCQExamPage } from './pages/MCQExamPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="semester/:semester" element={<SemesterPage />} />
          <Route path="semester/:semester/subject/:subject" element={<SubjectPage />} />
          <Route path="semester/:semester/subject/:subject/year/:year" element={<QuestionsPage />} />
          <Route path="mcq" element={<MCQListPage />} />
          <Route path="mcq/:setId" element={<MCQExamPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
