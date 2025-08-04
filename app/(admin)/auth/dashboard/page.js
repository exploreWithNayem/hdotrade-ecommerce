import React from "react";
import AdminSidebar from "./component/AdminSidebar";
import AdminNavbar from "./component/AdminNavbar";

import CardPageVisits from "./component/CardPageVisit";
import CardSocialTraffic from "./component/CartTraffic";
import HeaderStats from "./component/AdminStats";

export default function page() {
  return (
    <div className="h-screen">
      <AdminSidebar />

      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* {children} */}
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardPageVisits />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardSocialTraffic />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
