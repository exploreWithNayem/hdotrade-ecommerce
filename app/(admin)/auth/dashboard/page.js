import React from "react";

import CardPageVisits from "./component/CardPageVisit";

import HeaderStats from "./component/AdminStats";

export default function page() {
  return (
    <div className="relative md:ml-64 bg-blueGray-100">

      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* {children} */}
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>

        </div>
      </div>
    </div>
  );
}
