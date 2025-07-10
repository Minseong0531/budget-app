import { useState } from "react";
import Header from "../component/header";
import TodaySummaryCard from "../component/DashBoard/TodaySummaryCard";
import PieGraph from "../component/DashBoard/PieGraph";

function Home() {
    return (
      <section>
        <Header />
        <TodaySummaryCard />
        <PieGraph />
      </section>
    )
  }
  
  export default Home;