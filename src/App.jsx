import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import HomePage from "./pages/HomePage";
import { AboutPage, CoursesPage, InstructorsPage, PricingPage, ContactPage } from "./pages/InfoPages";
import { SignupPage, ForgotPasswordPage } from "./pages/AuthExtraPages";
import ScrollToTop from "./components/ScrollToTop";
import Home2Page from "./pages/Home2Page";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";

function Loading({text}){return <div className="grid min-h-screen place-items-center bg-executive-950 text-white"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold-500/20 border-t-gold-500"/><p className="mt-4 text-xs uppercase tracking-[0.25em] text-slate-500">{text}</p></div></div>}
function Protected({children,role}){const {user,loading}=useAuth();if(loading)return <Loading text="Loading account"/>;if(!user)return <Navigate to="/login" replace/>;if(role&&user.role!==role)return <Navigate to={user.role==="admin"?"/admin":"/dashboard"} replace/>;return children}
function AnimatedRoutes(){const location=useLocation();return <AnimatePresence mode="wait"><Routes location={location} key={location.pathname}>
<Route index path="/" element={<HomePage/>}/><Route path="/home2" element={<Home2Page/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/blog" element={<BlogPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/courses" element={<CoursesPage/>}/><Route path="/instructors" element={<InstructorsPage/>}/><Route path="/pricing" element={<PricingPage/>}/><Route path="/contact" element={<ContactPage/>}/>
<Route path="/login" element={<LoginPage/>}/><Route path="/signup" element={<SignupPage/>}/><Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
<Route path="/book" element={<Protected><BookingPage/></Protected>}/><Route path="/payment" element={<Protected role="user"><PaymentPage/></Protected>}/><Route path="/dashboard" element={<Protected role="user"><UserDashboard/></Protected>}/><Route path="/admin" element={<Protected role="admin"><AdminDashboard/></Protected>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></AnimatePresence>}
export default function App(){return <ThemeProvider><BrowserRouter><ScrollToTop/><AuthProvider><AnimatedRoutes/></AuthProvider></BrowserRouter></ThemeProvider>}
