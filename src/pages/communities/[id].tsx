import { GetServerSideProps } from "next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import {
  fetchCommunityDataSets,
  fetchDeleteCommunity,
  fetchUpdateCommunityName,
} from "../../apis/communities";
import CharactersTable from "../../components/characters/indexTabs/charactersTable";
import { CharacterDataset, Community } from "../../utils/type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const communityId: string = context.params!.id as string;
  return {
    props: {
      communityId,
    },
  };
};
type Props = {
  props: {
    communityId: string;
  };
};
const Community = ({ communityId }: { communityId: string }) => {
  type CharacterCommunities = {
    community: Community;
    characters: CharacterDataset | undefined;
  };
  const [dataset, setDataset] = useState<CharacterCommunities | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const data: CharacterCommunities = await fetchCommunityDataSets(
        communityId
      ).then((res) => res.data);
      console.log(data);
      // const { community, characters } = data;
      setDataset(data);
    })();
  }, []);
  const onDeleteHandler = async (communityId: string) => {
    await fetchDeleteCommunity(communityId);
    Router.push({
      pathname: "/characters",
      query: { tab: 1 },
    });
  };
  const [isEditing, setIsEditing] = useState(false);
  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setDataset((prev) => ({
      ...prev!,
      community: { ...prev!.community, name: text },
    }));
  };
  const openInputHandler = () => {
    setIsEditing(true);
  };
  const endEditHandler = async () => {
    setIsEditing(false);
    const { name } = dataset?.community!;
    await fetchUpdateCommunityName(communityId, name);
  };

  return (
    <>
      <h1 onClick={openInputHandler} onBlur={endEditHandler}>
        {isEditing ? (
          <input
            type="text"
            onChange={(e) => onNameChangeHandler(e)}
            value={dataset?.community.name}
          />
        ) : (
          dataset?.community.name
        )}
      </h1>
      <CharactersTable
        dataset={dataset?.characters}
        dataLength={dataset?.characters?.length}
      />
      <button onClick={() => onDeleteHandler(dataset!.community!.id)}>
        comuを削除
      </button>
    </>
  );
};

export default Community;
