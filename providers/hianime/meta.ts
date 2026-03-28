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

    const res = await axios.get(`https://hianime.to/${link}`);
    const html = res.data;

    const title =
      html.match(/<h2 class="film-name.*?>(.*?)<\/h2>/)?.[1]?.trim() || "";

    const image =
      html.match(/<img class="film-poster-img" src="(.*?)"/)?.[1] || "";

    const synopsis =
      html.match(/<div class="film-description.*?>(.*?)<\/div>/)?.[1] || "";

    const episodeMatches = [
      ...html.matchAll(/data-id="(.*?)".*?data-number="(.*?)"/g),
    ];

    const links: Link["directLinks"] = episodeMatches.map((ep: any) => ({
      title: `Episode ${ep[2]}`,
      link: ep[1],
    }));

    return {
      title,
      synopsis,
      image,
      imdbId: "",
      type: "series",
      linkList: [
        {
          title,
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
