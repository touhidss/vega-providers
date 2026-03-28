import { Post, ProviderContext } from "../types";

export const getPosts = async function ({
  filter,
  signal,
  providerContext,
}: any): Promise<Post[]> {
  try {
    const { axios } = providerContext;

    const res = await axios.get(
      `https://hanime.tv/videos/hentai?order=${filter}`,
      { signal }
    );

    const html = res.data;

    const matches = [
      ...html.matchAll(
        /<a class="overlay" href="\/videos\/hentai\/(.*?)".*?<img src="(.*?)".*?alt="(.*?)"/gs
      ),
    ];

    const posts: Post[] = [];

    matches.forEach((m: any) => {
      posts.push({
        title: m[3],
        link: m[1],
        image: m[2],
      });
    });

    return posts;
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
      `https://hanime.tv/search?query=${searchQuery}`,
      { signal }
    );

    const html = res.data;

    const matches = [
      ...html.matchAll(
        /<a class="overlay" href="\/videos\/hentai\/(.*?)".*?<img src="(.*?)".*?alt="(.*?)"/gs
      ),
    ];

    const posts: Post[] = [];

    matches.forEach((m: any) => {
      posts.push({
        title: m[3],
        link: m[1],
        image: m[2],
      });
    });

    return posts;
  } catch {
    return [];
  }
};
