import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from './AdminLayout';
import SettingsSection from './sections/SettingsSection';
import HomeSection from './sections/HomeSection';
import ServicesSection from './sections/ServicesSection';
import TrainingSection from './sections/TrainingSection';
import BlogSection from './sections/BlogSection';
import AboutSection from './sections/AboutSection';
import InboxSection from './sections/InboxSection';
import ChangePasswordSection from './sections/ChangePasswordSection';

const SECTIONS = {
  settings: SettingsSection,
  home: HomeSection,
  services: ServicesSection,
  training: TrainingSection,
  blog: BlogSection,
  about: AboutSection,
  inbox: InboxSection,
  changePassword: ChangePasswordSection,
};

export default function AdminDashboard() {
  const { isLoggedIn } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('settings');

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;

  const SectionComponent = SECTIONS[activeSection] || SettingsSection;

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <SectionComponent />
    </AdminLayout>
  );
}
