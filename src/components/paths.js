import DashboardPage from './Dashboard/Dashboard';
import AdminPage from './Admin/Admin';

import {
  Dashboard,
  Person,
  // ContentPaste,
  // LibraryBooks,
  // BubbleChart,
  // LocationOn,
  // Notifications
} from "@material-ui/icons";

const paths = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin",
    sidebarName: "Admin",
    navbarName: "Admin",
    icon: Person,
    component: AdminPage
  },
  { redirect: true, path: "/", to: "/admin", navbarName: "Redirect" }
];

export default paths;
