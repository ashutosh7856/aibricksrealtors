"use client";
import React from "react";
import TrendingProjects from "./TrendingProjects";

const TrendingProjectsClient = ({ initialProperties = [] }) => {
  return (
    <div>
      <TrendingProjects initialProperties={initialProperties} />
    </div>
  );
};

export default TrendingProjectsClient;
