export interface Appoint {
  id: string;
  user_id: string;
  title: string;
  desc: string;
  start: string;
  end: string;
  created_at: string;
  updated_at: string;
}

export type Appoints = Appoint[];
