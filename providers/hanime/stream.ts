import { Stream, ProviderContext } from "../types";

export const getStream = async function ({
  link,
  providerContext,
}: any): Promise<Stream[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://hanime.tv/videos/hentai/${link}`
    );

    const html = res.data;

    const json = html.match(/window\.__NUXT__=(.*?);<\/script>/)?.[1];
    const data = JSON.parse(json);

    const streams = data.state.video.videos_manifest.servers;

    const out: Stream[] = [];

    streams.forEach((s: any) => {
      s.streams.forEach((q: any) => {
        out.push({
          server: "Hanime",
          link: q.url,
          type: "mp4",
          subtitles: [],
        });
      });
    });

    return out;
  } catch {
    return [];
  }
};
