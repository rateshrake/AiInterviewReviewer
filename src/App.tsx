import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewSetupPage } from './pages/InterviewSetupPage';
import { InterviewRoomPage } from './pages/InterviewRoomPage';
import { InterviewReportPage } from './pages/InterviewReportPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SettingsPage } from './pages/SettingsPage';
import { HistoryPage } from './pages/HistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const PageRenderer: React.FC = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'dashboard':
      return <DashboardPage />;
    case 'interview-setup':
      return <InterviewSetupPage />;
    case 'interview-room':
      return <InterviewRoomPage />;
    case 'interview-report':
      return <InterviewReportPage />;
    case 'subscription':
      return <SubscriptionPage />;
    case 'settings':
      return <SettingsPage />;
    case 'my-interviews':
      return <HistoryPage />;
    case 'performance-analytics':
      return <AnalyticsPage />;
    default:
      return <DashboardPage />;
  }
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout>
        <PageRenderer />
      </AppLayout>
    </AppProvider>
  );
};

export default App;
