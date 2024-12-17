import EmployeeDashboard from '../components/EmployeeDashboard';
import AdminDashboard from '../components/AdminDashboard';
import { useUserInfo } from '../context/authStore';

const Dashboard = () => {
  const { isAuthenticated, role } = useUserInfo();

  return (
    <>
      {isAuthenticated && role === 'employee' ? (
        <EmployeeDashboard />
      ) : (
        <AdminDashboard />
      )}
    </>
  );
};

export default Dashboard;