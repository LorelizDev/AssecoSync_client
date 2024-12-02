import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { RegisterForm } from '../pages/Register';

export const router = createBrowserRouter([{
    path : '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        // Nueva ruta para el Dashboard
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
    ],
  },
]);

// import { createBrowserRouter } from 'react-router-dom';
//import { Layout } from '../layout/Layout.jsx';
// import { EmployeeRoutes, AdminRoutes } from '../layout/PrivateRoutes.jsx';
// import {
//     Login,
//     SignUp,
//     Home,
//     Profile,
//     PersonalCalendar,
//     MyRequests,
//     Certificate,
//     Request,
//     RequestsList,
//     Register,
//     EmployeesList,
//     AdminCalendar,
//     Stadistics
// } from '../pages';

// export const router = createBrowserRouter([{
//     path : '/',
//     element: <Layout/>,
//     children: [
//             {
//                 path:'login',
//                 element: <Login/>
//             },
//             {
//             path : 'auth',
//             element: <AuthRoutes/>,
//             children: [
                // {
                //     index: true,
                //     path: 'home',
                //     element: <Home/>
                // },
//                 {
//                     path : 'employee',
//                     element: <EmployeeRoutes/>,
//                     children: [
//                             {
//                                 path:'profile',
//                                 element: <Profile/>,
//                                 children: [
//                                     {
//                                         path:'absences',
//                                         element: <AbsencesList/>,
//                                         children: [
//                                             {
//                                                 path:'my_certificate',
//                                                 element: <Certificate/>
//                                             },
//                                         ]
//                                     },
//                                     {
//                                         path:'clock_in_list',
//                                         element: <ClockInList/>
//                                     },
//                                 ]
//                             },
//                             {
//                                 path:'personal_calendar',
//                                 element: <PersonalCalendar/>,
//                                 children: [
//                                     {
//                                         path:'request',
//                                         element: <Request/>
//                                     },
//                                 ]
//                             },
//                             {
//                                 path:'my_requests',
//                                 element: <MyRequests/>
//                             },
//                     ]
//                 },
//                 {
//                     path : 'admin',
//                     element: <AdminRoutes/>,
//                     children: [
//                         {
//                             path:'requests_list',
//                             element: <RequestsList/>
//                         },
//                         {
//                             path:'register_new_employee',
//                             element: <Register/>
//                         },
//                         {
//                             path:'employee_profile',
//                             element: <Profile/>,
//                             children: [
//                                 {
//                                     path:'absences',
//                                     element: <AbsencesList/>,
//                                     children: [
//                                         {
//                                             path:'certificate_absence',
//                                             element: <Certificate/>
//                                         },
//                                         {
//                                             path:'edit_absence',
//                                             element: <EditAbsence/>
//                                         },
//                                     ]
//                                 },
//                                 {
//                                     path:'clock_in_list',
//                                     element: <ClockInList/>,
//                                     children: [
//                                         {
//                                             path:'edit_clock_in',
//                                             element: <EditClockIn/>
//                                         },
//                                     ]
//                                 },
//                                 {
//                                     path:'edit_profile',
//                                     element: <EditProfile/>
//                                 },
//                             ],
//                         },
//                     ],
//                     },
//             ],
//             },
//         ],
// }])