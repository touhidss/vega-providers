import { Post, ProviderContext } from "../types";

export const getPosts = async function ({
  filter,
  signal,
  providerContext,
}: {
  filter: string;
  page: number;
  providerValue: string;
  signal: AbortSignal;
  providerContext: ProviderContext;
}): Promise<Post[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://members.hanime.tv/api/v8/browse?order=${filter}`,
      { signal }
    );

    const data = res.data?.hentai_videos || [];
    const catalog: Post[] = [];

    data.forEach((e: any) => {
      if (e?.name && e?.slug && e?.cover_url) {
        catalog.push({
          title: e.name,
          link: e.slug,
          image: e.cover_url,
        });
      }
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
}: {
  searchQuery: string;
  page: number;
  providerValue: string;
  signal: AbortSignal;
  providerContext: ProviderContext;
}): Promise<Post[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://members.hanime.tv/api/v8/search?q=${encodeURIComponent(searchQuery)}`,
      { signal }
    );

    const data = res.data?.hentai_videos || [];
    const catalog: Post[] = [];

    data.forEach((e: any) => {
      if (e?.name && e?.slug && e?.cover_url) {
        catalog.push({
          title: e.name,
          link: e.slug,
          image: e.cover_url,
        });
      }
    });

    return catalog;
  } catch {
    return [];
  }
};
