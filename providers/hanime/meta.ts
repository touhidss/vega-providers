import { Info, Link, ProviderContext } from "../types";

export const getMeta = async function ({
  link: id,
  providerContext,
}: {
  link: string;
  providerContext: ProviderContext;
}): Promise<Info> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(`https://hanime.tv/api/v8/video?id=${id}`);
    const data = res.data;

    const meta = {
      title: data.name,
      synopsis: data.description,
      image: data.cover_url,
      imdbId: "",
      type: "movie",
    };

    const links: Link["directLinks"] = [];

    data.videos_manifest.servers.forEach((server: any) => {
      server.streams.forEach((stream: any) => {
        links.push({
          title: `${stream.height}p`,
          link: stream.url,
        });
      });
    });

    return {
      ...meta,
      linkList: [
        {
          title: meta.title,
          directLinks: links,
        },
      ],
    };
  } catch (err) {
    return {
      title: "",
      synopsis: "",
      image: "",
      imdbId: "",
      type: "movie",
      linkList: [],
    };
  }
};
