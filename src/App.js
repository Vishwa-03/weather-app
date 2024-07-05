import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Authentication from "./components/Authentication";
import { Route, Routes } from "react-router-dom";
import PrivatPageLayout from "./layouts/PrivatePageLayout";


const App = () => {
 
  return (
    <div >
    {/* <Navbar/> */}
    <Routes>
      {/*   */}
      {/* <Route path="/" element={<Dashboard />} /> */}

      {/* auth pages  */}
      <Route path="/" element={<Authentication />} />

      <Route path="*" element={Error} />
      {/* private pages */}
      <Route element={<PrivatPageLayout />}>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
    </Routes>
  </div>
  );
};

export default App;
