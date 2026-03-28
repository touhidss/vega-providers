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
      `https://hanime.tv/api/v8/browse`,
      { signal }
    );

    const data = res.data?.results || res.data;
    const catalog: Post[] = [];

    data?.map((element: any) => {
      const title = element.name;
      const link = element.slug;
      const image = element.cover_url;

      if (title && link && image) {
        catalog.push({
          title,
          link,
          image,
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
      `https://hanime.tv/api/v8/search?q=${searchQuery}`,
      { signal }
    );

    const data = res.data?.results || res.data;
    const catalog: Post[] = [];

    data?.map((element: any) => {
      const title = element.name;
      const link = element.slug;
      const image = element.cover_url;

      if (title && link && image) {
        catalog.push({
          title,
          link,
          image,
        });
      }
    });

    return catalog;
  } catch {
    return [];
  }
};
