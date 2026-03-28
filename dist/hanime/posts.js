import { Post, ProviderContext } from "../types";

export const getPosts = async function ({
  filter,
  signal,
  providerContext,
}: any): Promise<Post[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://members.hanime.tv/api/v8/browse?order=${filter}`,
      {
        signal,
        headers: {
          Referer: "https://hanime.tv/",
          Origin: "https://hanime.tv",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const data = res.data?.hentai_videos || [];
    const catalog: Post[] = [];

    data.forEach((e: any) => {
      catalog.push({
        title: e.name,
        link: e.slug,
        image: e.cover_url,
      });
    });

    return catalog;
  } catch {
    return [];
  }
};

export const getSearchPosts = async function ({
  searchQuery,
  signal,
  providerContext,
}: any): Promise<Post[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://members.hanime.tv/api/v8/search?q=${encodeURIComponent(searchQuery)}`,
      {
        signal,
        headers: {
          Referer: "https://hanime.tv/",
          Origin: "https://hanime.tv",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const data = res.data?.hentai_videos || [];
    const catalog: Post[] = [];

    data.forEach((e: any) => {
      catalog.push({
        title: e.name,
        link: e.slug,
        image: e.cover_url,
      });
    });

    return catalog;
  } catch {
    return [];
  }
};
