export type Player = {
  url: string;
  name: string;
  logo: string;
};

export type Episode = {
  id: number;
  number: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  duration: string;
  cover: string;
  player: string;
};

export type ApiEpisode = {
  id: number;
  number: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  formatted_published_at: string;
  formatted_duration: string;
  image_url: string;
  embed_html_player: string;
};

export type Host = {
  name: string;
  bio: string;
  avatar: string;
};
