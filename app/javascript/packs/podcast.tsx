import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Podcast, Episode } from "../pages/podcast";
import { Episode as EpisodeType, ApiEpisode } from "../pages/podcast/types";

import "../packs/tailwind.css";
import "../packs/podcast-episode-description.css";

const apiEpisodeToEpisode = (apiEpisode: ApiEpisode): EpisodeType => ({
  id: apiEpisode.id,
  slug: apiEpisode.slug,
  number: apiEpisode.number,
  title: apiEpisode.title,
  summary: apiEpisode.summary,
  description: apiEpisode.description,
  date: apiEpisode.formatted_published_at,
  duration: apiEpisode.formatted_duration,
  cover: apiEpisode.image_url,
  player: apiEpisode.embed_html_player,
});

const podcastApp = document.getElementById("podcast-app");

if (podcastApp) {
  const dataEpisodes = JSON.parse(podcastApp.dataset?.episodes);
  const episodes: EpisodeType[] = dataEpisodes.map(apiEpisodeToEpisode);

  document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <ErrorBoundary>
        <Podcast episodes={episodes} />
      </ErrorBoundary>,
      podcastApp
    );
  });
}

const podcastEpisodeApp = document.getElementById("podcast-episode-app");

if (podcastEpisodeApp) {
  const dataEpisode = JSON.parse(podcastEpisodeApp.dataset.episode);
  const episode: EpisodeType = apiEpisodeToEpisode(dataEpisode);

  document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <ErrorBoundary>
        <Episode episode={episode} />
      </ErrorBoundary>,
      podcastEpisodeApp
    );
  });
}
