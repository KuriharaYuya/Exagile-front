import axios from "axios";
import { communities, community } from "../config/urls";

export const fetchCommunitiesIndex = async () => {
  return await axios.get(communities);
};
export const fetchCommunityDataSets = async (communityId: string) => {
  return await axios.get(community(communityId));
};

export const fetchDeleteCommunity = async (communityId: string) => {
  await axios.delete(community(communityId));
};
export const fetchUpdateCommunityName = async (
  communityId: string,
  name: string
) => {
  await axios.put(community(communityId), { name });
};

export const fetchAddCommunityHandler = async (name: string) => {
  return await axios.post(communities, { community: { name } });
};
