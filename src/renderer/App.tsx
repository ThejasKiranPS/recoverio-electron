import { MantineProvider } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Recover } from 'pages/Recover/Recover';
import { ScanPage } from 'pages/Recover/Scan/Scan';
import { Format } from 'pages/Format/Format.page';
import { MainWindow } from '../pages/MainWindow/MainWindow';
import { FormatProgress } from 'pages/Format/Progress';
import { useEffect } from 'react';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/recover/scan" element={<ScanPage />} />
          <Route path="/format" element={<Format />} />
          <Route path="/format/progress" element={<FormatProgress />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
