import { AppBar, Tab, Tabs } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import Characters from "../../components/characters/indexTabs/characters";
import Communities from "../../components/characters/indexTabs/communities";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tgt = context.query.tab as string;
  const tab = tgt ? parseInt(tgt, 10) : 0;

  return {
    props: {
      tabNumber: tab,
    },
  };
};
type Props = { tabNumber: number };
export default function SimpleTabs({ tabNumber }: Props) {
  const [value, setValue] = React.useState(tabNumber);

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
          <Tab label="キャラクター一覧" />
          <Tab label="コミュニティ" />
        </Tabs>
      </AppBar>
      {value === 0 && <Characters />}
      {value === 1 && <Communities />}
    </>
  );
}
