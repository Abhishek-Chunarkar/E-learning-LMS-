import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Futur from "./landing/futur";
import MainLayout from "./layout/MainLayout";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import WhyCodeMate from "./landing/WhyCodemate";
import PopularCourses from "./landing/PopularCourses";
import TermsAndConditions from "./landing/terms";
import PrivacyPolicy from "./landing/privacy";
import CookieSettings from "./landing/cookie";
import Sitemap from "./landing/sitemap";
import CTASection from "./landing/cta";
import Cards from "./landing/Cards"
import FAQPage from "./landing/faq";
import AboutUs from "./landing/AboutUs";
import ContactUs from "./landing/ContactUs";
import Footer from "./landing/footer";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/student/forget/forgetpassword";
import VerifyOtp from "./pages/student/forget/verifyOtp";
import ResetPassword from "./pages/student/forget/resetpassword";
import { Settings } from "lucide-react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Cards />
            <Futur />
            <WhyCodeMate />
            <PopularCourses />
            <CTASection />
            <FAQPage />
            <AboutUs />
            <ContactUs />
            <Footer />
          </>
        ),
      },
      {
        path: "terms",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookie",
        element: <CookieSettings/>,
      },
      {
        path: "sitemap",
        element: <Sitemap />,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verifyOtp",
        element: <VerifyOtp />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },

      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
