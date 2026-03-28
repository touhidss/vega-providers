import { Post } from "../types";

export const getPosts = async (): Promise<Post[]> => {
  return [
    {
      title: "Open Hanime",
      link: "welcome-to-the-hentai-world",
      image: "https://placehold.co/300x400",
    },
  ];
};

export const getSearchPosts = async (): Promise<Post[]> => {
  return [];
};
