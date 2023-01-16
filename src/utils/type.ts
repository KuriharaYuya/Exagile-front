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
