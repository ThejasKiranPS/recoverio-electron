import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Recover } from 'pages/Recover/Recover';
import { ScanPage } from 'pages/Recover/Scan/Scan';
import { MainWindow } from '../pages/MainWindow/MainWindow';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/recover/scan" element={<ScanPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
