"use client";
import React, { useEffect } from "react";

const dashboard = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/account");
        const data = await response.json();
        console.log("dataDashboard===>", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);
  return <div>dashboard</div>;
};

export default dashboard;
