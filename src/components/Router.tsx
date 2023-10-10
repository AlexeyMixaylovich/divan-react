import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChatUI } from '../pages/ChatPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<ChatUI />}
          path="/"
        />

        <Route
          element={<div>NotFound</div>}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
}
