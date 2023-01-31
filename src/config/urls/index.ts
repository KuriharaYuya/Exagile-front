const DEFAULT_API_LOCALHOST = "http://localhost:3001/api/v1";

export const signup = `${DEFAULT_API_LOCALHOST}/signup`;
export const login = `${DEFAULT_API_LOCALHOST}/login`;
export const sessionCheck = `${DEFAULT_API_LOCALHOST}/sessions/check`;
export const logout = `${DEFAULT_API_LOCALHOST}/logout`;
export const appoints = `${DEFAULT_API_LOCALHOST}/appoints`;
export const appointDetail = (id: string) => {
  return `${DEFAULT_API_LOCALHOST}/appoints/${id}`;
};
export const characterSearch = `${DEFAULT_API_LOCALHOST}/characters`;
export const appointCharacters = `${DEFAULT_API_LOCALHOST}/appoint_characters`;
export const charactersBoundWithAppoint = `${DEFAULT_API_LOCALHOST}/appoint_characters/characters`;
export const appointBoundWithCharacter = `${DEFAULT_API_LOCALHOST}/appoint_characters/appoints`;
export const characterDetail = `${DEFAULT_API_LOCALHOST}/characters/details`;
export const topic = `${DEFAULT_API_LOCALHOST}/topics`;
export const topicDetail = (topicId: string) => {
  return `${DEFAULT_API_LOCALHOST}/topics/${topicId}`;
};
export const characterShow = (characterId: string) => {
  return `${characterSearch}/${characterId}` as string;
};
export const characterCommunities = (characterId: string) => {
  return `${characterSearch}/${characterId}/communities_suggestion` as string;
};
export const charactersCommunities = `${DEFAULT_API_LOCALHOST}/characters_communities`;
export const unregisterCommunity = `${DEFAULT_API_LOCALHOST}/characters/unregister_community`;
export const indexCharacterCommunities = `${DEFAULT_API_LOCALHOST}/characters/characters_communities`;
export const communities = `${DEFAULT_API_LOCALHOST}/communities`;
export const community = (communityId: string) => {
  return `${communities}/${communityId}`;
};
export const faqDetail = (faqId: string) =>
  `${DEFAULT_API_LOCALHOST}/faqs/${faqId}`;
export const faqs = `${DEFAULT_API_LOCALHOST}/faqs`;
export const usersManipulateOpt = `${DEFAULT_API_LOCALHOST}/users/options`;
export const insights = `${DEFAULT_API_LOCALHOST}/insights`;
export const insight = (insightId: string) =>
  `${DEFAULT_API_LOCALHOST}/insights/${insightId}`;
export const reviews = `${insights}/reviews`;
