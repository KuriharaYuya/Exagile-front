export interface Appoint {
  id: string;
  user_id: string;
  title: string;
  desc: string;
  content: string;
  start: string;
  end: string;
  created_at: string;
  updated_at: string;
}

export type Appoints = Appoint[];

export interface Character {
  id: string;
  name: string;
  user_id: string;
  profile: string;
}

export type Characters = Character[];

export type Topic = {
  id: string;
  title: string;
  content: string;
  updated_at: string;
};

export type Topics = Topic[];

export type TagModalState = {
  character: Character;
  topics: Topics;
};

export type CharacterTopic = {
  id: string;
  character_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  appoint_id: string;
  appointId: string;
  appointTitle: string;
  appointStart: string;
};
export type CharacterTopics = CharacterTopic[];

export type Community = {
  userId: string;
  id: string;
  characterId: string;
  name: string;
};
export type Communities = Community[];

export type CharacterDataset = {
  character: Character;
  communities: Community[];
}[];

export type Faq = {
  id: string;
  name: string;
  content: string;
  inspiredFaqs: string;
  appliedFaqs: string;
  created_at: string;
  updated_at: string;
};
export type Faqs = {
  inspiredFaqs: Faq[] | undefined;
  appliedFaqs: Faq[] | undefined;
};

export type UserManipulateOpts = {
  faqs: {
    sort: { created_at: "asc" | "desc"; tags: "asc" | "desc" };
    filter: { tags: string };
  };
};

export type Insight = {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  appoint_id: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  reviewed_at: string;
  concerning: boolean;
};
export type Insights = Insight[];

export type TopicIdea = {
  id: string;
  appoint_id: string;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
  done: boolean;
  idea_type: string;
};
