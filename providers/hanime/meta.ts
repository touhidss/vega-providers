import { Info, Link, ProviderContext } from "../types";

export const getMeta = async function ({
  link,
  providerContext,
}: {
  link: string;
  providerContext: ProviderContext;
}): Promise<Info> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://hanime.tv/api/v8/video?id=${link}`
    );

    const data = res.data;

    const links = data.videos_manifest.servers[0].streams.map((s: any) => ({
      title: s.height + "p",
      link: s.url,
    }));

    return {
      title: data.name,
      synopsis: data.description,
      image: data.cover_url,
      imdbId: "",
      type: "movie",
      linkList: [
        {
          title: data.name,
          directLinks: links,
        },
      ],
    };
  } catch {
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
