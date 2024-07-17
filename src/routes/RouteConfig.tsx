import { Navigate, RouteObject } from "react-router-dom";
import { PATHS } from "@config/constants/paths";
import GuestLayout from "@layouts/GuestLayout/GuestLayout";
import { lazy } from "react";
import { GuestGuard } from "@guards/GuestGuard";
import AuthLayout from "@layouts/authLayout/AuthLayout";
import { AuthGuard } from "@guards/AuthGuard";
import DashboardLayout from "@layouts/dashboardLayout/DashboardLayout";
import { RoleBasedGuard } from "@guards/RoleBasedGuard";
import { UserRoleEnum } from "@config/enums/role.enum";
// import { GuestGuard } from '@guards/GuestGuard'
// import AuthLayout from '@layouts/authLayout/AuthLayout'
// import DashboardLayout from '@layouts/dashboardLayout/DashboardLayout'
// import { AuthGuard } from '@guards/AuthGuard'
// import { RoleBasedGuard } from '@guards/RoleBasedGuard'
// import { UserRoleEnum } from '@config/enums/role.enum'

const HomePage = lazy(() => import("src/pages/home/HomePage"));
const NotFound = lazy(() => import("src/pages/notFound/NotFound"));
const SignUpPage = lazy(() => import("src/pages/auth/signup/signupPage"));
const LoginPage = lazy(() => import("src/pages/auth/login/LoginPage"));
const SetPasswordPage = lazy(
  () => import("src/pages/auth/setPassword/SetPasswordpage")
);
const EmailConfirmationPage = lazy(
  () =>
    import(
      "src/pages/auth/forgetPassword/emailConfirmationPage/EmailConfirmationPage"
    )
);
const DashboardPage = lazy(() => import("src/pages/dashboard/DashboardPage"));
const ProfilePage = lazy(
  () => import("src/pages/dashboard/profile/ProfilePage")
);
const AccountSettingsPage = lazy(
  () => import("src/pages/dashboard/accountSettings/AccountSettingsPage")
);
const AboutUsPage = lazy(() => import("src/pages/about/AboutUsPage"));
const UsersPage = lazy(
  () => import("src/pages/dashboard/admin/users/UsersPage")
);
const AllUsersTable = lazy(
  () => import("src/pages/dashboard/admin/users/allUsersTable/AllUsersTable")
);
const PendingUsersTable = lazy(
  () =>
    import(
      "src/pages/dashboard/admin/users/pendingUsersTable/PendingUsersTable"
    )
);
const AcceptedUsersTable = lazy(
  () =>
    import(
      "src/pages/dashboard/admin/users/acceptedUsersTable/AcceptedUsersTable"
    )
);
export const ROUTE_CONFIG: RouteObject[] = [
  {
    path: PATHS.AUTH.ROOT,
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: PATHS.AUTH.LOGIN, element: <LoginPage /> },
      { path: PATHS.AUTH.SIGNUP, element: <SignUpPage /> },
      { path: PATHS.AUTH.SET_PASSWORD, element: <SetPasswordPage /> },
      { path: PATHS.AUTH.FORGET_PASSWORD, element: <EmailConfirmationPage /> },
    ],
  },
  {
    path: PATHS.ROOT,
    element: <GuestLayout />,
    children: [
      { path: PATHS.ROOT, element: <HomePage /> },
      { path: PATHS.ABOUT_US, element: <AboutUsPage /> },
    ],
  },
  {
    path: PATHS.DASHBOARD.ROOT,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: PATHS.DASHBOARD.ROOT, element: <DashboardPage /> },
      { path: PATHS.DASHBOARD.PROFILE.ROOT, element: <ProfilePage /> },
      {
        path: PATHS.DASHBOARD.PROFILE.SETTINGS,
        element: <AccountSettingsPage />,
      },
      {
        path: PATHS.DASHBOARD.ADMIN.USERS.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
            <UsersPage />
          </RoleBasedGuard>
        ),
        children: [
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ROOT,
            element: <Navigate to={PATHS.DASHBOARD.ADMIN.USERS.ALL} />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ALL,
            element: <AllUsersTable />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.PENDING,
            element: <PendingUsersTable />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ACCEPTED,
            element: <AcceptedUsersTable />,
          },
        ],
      },

      // {
      //   path: PATHS.DASHBOARD.ADMIN.USERS.ADD_USER,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <AddUserPages />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.USERS.EDIT_USER,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <AddUserPages />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.LANGUAGES.ROOT,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <LanguagesPage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.CATEGORY.ROOT,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <CategoriesPage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.CATEGORY.EDIT_CATEGORY,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <CategoriesPage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.COURSES.ROOT,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <CoursesPage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.COURSES.ADD_COURSE,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <AddCoursePage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.ADMIN.COURSES.EDIT_COURSE,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.ADMIN]}>
      //       <EditCoursePage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.STUDENT.MY_QUIZZES,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.USER]}>
      //       <StudentQuizPage />
      //     </RoleBasedGuard>
      //   ),
      // },
      // {
      //   path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
      //   element: (
      //     <RoleBasedGuard accessibleRoles={[UserRoleEnum.USER]}>
      //       <StudentCoursesPage />
      //     </RoleBasedGuard>
      //   ),
      //   children: [
      //     {
      //       path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
      //       element: <EnrolledCoursesList />,
      //     },
      //     {
      //       path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.COMPLETED_COURSES,
      //       element: <CompletedCoursesList />,
      //     },
      //   ],
      // },
    ],
  },
  { path: PATHS.MAIN.ERROR.P_404, element: <NotFound /> },
  {
    path: PATHS.ANY,
    element: <Navigate to={PATHS.MAIN.ERROR.P_404} replace />,
  },
];
