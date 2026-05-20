export type GifItem = {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  width: number;
  height: number;
  source: string;
};

export type GiphyResponse = {
  data: Array<{
    id: string;
    title?: string;
    url?: string;
    bitly_url?: string;
    source_tld?: string;
    images?: Record<
      string,
      {
        url?: string;
        width?: string;
        height?: string;
        mp4?: string;
      }
    >;
  }>;
  pagination?: {
    count: number;
    offset: number;
    total_count?: number;
  };
};
