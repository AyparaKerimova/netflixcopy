import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLayout from "./components/admin/AdminLayout";
import ClientLayout from "./components/client/ClientLayout";
import AdminRoute from "./routes/AdminRoute";
import ClientRoute from "./routes/ClientRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientLogin from "./pages/client/ClientLogin";
import RegistrationPrevious from "./pages/client/RegistrationPrevious";
import ClientRegister from "./pages/client/ClientRegister";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import MembershipPlan from "./pages/client/MembershipPlan.jsx";
import ClientPayment from "./pages/client/ClientPayment.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import AddMovie from "./pages/admin/AddMovie.jsx";
import AddSerie from "./pages/admin/AddSerie.jsx";
import AdminMovieDetails from "./pages/admin/AdminMovieDetails.jsx";
import AdminSerieDetails from "./pages/admin/AdminSerieDetails.jsx";
import AdminMoviePlayer from "./pages/admin/AdminMoviePlayer.jsx";
import AdminSeriePlayer from "./pages/admin/AdminSeriePlayer.jsx";
import ClientMovieDetails from "./pages/client/ClientMovieDetails.jsx";
import ClientSerieDetails from "./pages/client/ClientSerieDetails.jsx";
import ClientMoviePlayer from "./pages/client/ClientMoviePlayer.jsx";
import ClientSeriePlayer from "./pages/client/ClientSeriePlayer.jsx";
import ClientProfile from "./pages/client/ClientProfile.jsx";
import Chat from "./components/common/Chat.jsx";
import MyList from "./pages/client/MyList.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/add-movie" element={<AddMovie />} />
        <Route path="/admin/add-serie" element={<AddSerie />} />
        <Route path="/admin/messages/:id" element={<Chat />} />
        <Route path="/admin/settings" element={<h1>settings</h1>} />
        <Route path="/admin/statistics" element={<h1>statistics</h1>} />
        <Route
          path="/admin/movie-details/:id"
          element={<AdminMovieDetails />}
        />
        <Route
          path="/admin/serie-details/:id"
          element={<AdminSerieDetails />}
        />
        <Route path="/admin/movie-player/:id" element={<AdminMoviePlayer />} />
        <Route
          path="/admin/serie-player/:id/:index"
          element={<AdminSeriePlayer />}
        />

        <Route element={<ClientRoute />}>
          <Route element={<ClientLayout />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route
              path="/registration-previous"
              element={<RegistrationPrevious />}
            />
            <Route path="/client-registration" element={<ClientRegister />} />
            <Route path="/membership-plan" element={<MembershipPlan />} />
            <Route path="/payment" element={<ClientPayment />} />
            <Route path="/client/profile/:id" element={<ClientProfile />} />
            <Route
              path="/client/movie-details/:id"
              element={<ClientMovieDetails />}
            />
            <Route
              path="/client/serie-details/:id"
              element={<ClientSerieDetails />}
            />
            <Route
              path="/client/movie-player/:id"
              element={<ClientMoviePlayer />}
            />
            <Route
              path="/client/serie-player/:id/:index"
              element={<ClientSeriePlayer />}
            />
            <Route path="/client/messages/:id" element={<Chat />} />
            <Route path="/client/list/:userId" element={<MyList />} />
          </Route>
        </Route>
        <Route path="/client/login" element={<ClientLogin />} />
      </Routes>
    </Provider>
  );
};

export default App;
