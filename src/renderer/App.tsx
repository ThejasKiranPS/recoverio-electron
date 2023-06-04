import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MainWindow } from '../pages/MainWindow';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<MainWindow />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
