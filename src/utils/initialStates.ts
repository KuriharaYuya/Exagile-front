export const initialAppointState = {
  id: "",
  title: "",
  desc: "",
  content: "",
  start: "",
  end: "",
};
export const initialCharacterState = {
  id: "",
  name: "",
  user_id: "",
  profile: "",
};

export const initialTopicState = {
  id: "",
  title: "",
  content: "",
  updated_at: "",
};

export const initialTagModalState = {
  character: initialCharacterState,
  topics: [initialTopicState],
};

export const initialCharacterTopicState = {
  id: "",
  character_id: "",
  title: "",
  content: "",
  created_at: "",
  updated_at: "",
  appoint_id: "",
  appointId: "",
  appointTitle: "",
  appointStart: "",
};
