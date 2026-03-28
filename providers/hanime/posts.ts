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

    const order =
      filter === "/recent-movies" ? "latest" :
      filter === "/recent-shows" ? "popular" :
      "trending";

    const res = await axios.get(
      `https://hanime.tv/api/v8/browse?page=0&order=${order}`,
      { signal }
    );

    const data = res.data?.hentai_videos || [];
    const out: Post[] = [];

    data.forEach((e: any) => {
      if (e?.name && e?.slug && e?.cover_url) {
        out.push({
          title: e.name,
          link: e.slug,
          image: e.cover_url,
        });
      }
    });

    return out;
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
      `https://hanime.tv/api/v8/search?q=${encodeURIComponent(searchQuery)}`,
      { signal }
    );

    const data = res.data?.hentai_videos || [];
    const out: Post[] = [];

    data.forEach((e: any) => {
      if (e?.name && e?.slug && e?.cover_url) {
        out.push({
          title: e.name,
          link: e.slug,
          image: e.cover_url,
        });
      }
    });

    return out;
  } catch {
    return [];
  }
};
