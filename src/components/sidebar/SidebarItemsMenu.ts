import { PATHS } from "@config/constants/paths";
import { ElementType } from "react";
import { UserRoleEnum } from "@config/enums/role.enum";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

export interface SidebarItem {
  id: number;
  label: string;
  path: string;
  icon: ElementType;
  accessibleRoles?: UserRoleEnum[];
}

export const ItemsSidebar: SidebarItem[] = [
  {
    id: 1,
    label: "sidebar.dashboard",
    path: PATHS.DASHBOARD.STUDENT.ROOT,
    icon: DashboardOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },
  {
    id: 2,
    label: "sidebar.dashboard",
    path: PATHS.DASHBOARD.ADMIN.ROOT,
    icon: DashboardOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },

  {
    id: 3,
    label: "sidebar.enrolled_courses",
    path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
    icon: AutoStoriesOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },

  {
    id: 4,
    label: "sidebar.my_quiz",
    path: PATHS.DASHBOARD.STUDENT.MY_QUIZZES,
    icon: QuizOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },

  {
    id: 5,
    label: "sidebar.users",
    path: PATHS.DASHBOARD.ADMIN.USERS.ALL,
    icon: ManageAccountsOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },

  {
    id: 6,
    label: "sidebar.category",
    path: PATHS.DASHBOARD.ADMIN.CATEGORY.ROOT,
    icon: CategoryOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },

  {
    id: 7,
    label: "sidebar.courses",
    path: PATHS.DASHBOARD.ADMIN.COURSES.ROOT,
    icon: RocketLaunchOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },

];
