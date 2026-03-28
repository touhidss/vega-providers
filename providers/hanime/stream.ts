import { Stream, ProviderContext } from "../types";

export const getStream = async function ({
  link,
}: {
  link: string;
  providerContext: ProviderContext;
}): Promise<Stream[]> {
  return [
    {
      server: "Hanime",
      link: link,
      type: "mp4",
      headers: {},
      subtitles: [],
    },
  ];
};
