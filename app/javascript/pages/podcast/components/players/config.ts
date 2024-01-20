import { Player } from "../../types";

export const players: Player[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/6Qrqkf3HFHuhQU7Wjulo34",
    logo: "/img/podcast/player-icons/spotify.svg",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/ask-maybe/id1620888407?uo=4",
    logo: "/img/podcast/player-icons/apple-podcasts.svg",
  },
  {
    name: "Google Podcasts",
    url: "https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL2Fzay1tYXliZQ==",
    logo: "/img/podcast/player-icons/google-podcasts.svg",
  },
];

export default {
  players,
};
