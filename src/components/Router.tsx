import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ExperimentConfigsPage } from '../pages/ExperimentConfigsPage';
import { ExperimentDetail } from './Experiments/ExperementDetail';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<ExperimentConfigsPage />}
          path="/experiments"
        />
        <Route
          element={<ExperimentDetail />}
          path="/experiments/:id"
        />
        <Route
          element={<div>NotFound</div>}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
}
