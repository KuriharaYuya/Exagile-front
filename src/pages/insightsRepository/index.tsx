import { AppBar, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import Concerns from "../../components/insights/concerns";
import Reviews from "../../components/insights/reviews";
import { requestReviewInsights } from "../../features/insights";

const Index = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    (async () => {
      await requestReviewInsights();
    })();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="今意識しているもの" />
          <Tab label="復習リスト" />
        </Tabs>
      </AppBar>
      {value === 0 && <Concerns />}
      {value === 1 && <Reviews />}
    </>
  );
};

export default Index;
