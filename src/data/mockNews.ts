export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Tech Giants Announce Breakthrough in Quantum Computing",
    description: "Major technology companies have achieved a significant milestone in quantum computing, promising to revolutionize data processing.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=1",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Daily" },
    category: "technology"
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders have come together to sign a groundbreaking climate accord aimed at reducing carbon emissions.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=2",
    publishedAt: new Date().toISOString(),
    source: { name: "World News" },
    category: "environment"
  },
  {
    id: "3",
    title: "Revolutionary Medical Treatment Shows Promise",
    description: "Scientists develop new treatment method that could transform the way we approach certain diseases.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=3",
    publishedAt: new Date().toISOString(),
    source: { name: "Health Weekly" },
    category: "health"
  },
  {
    id: "4",
    title: "Sports Championship Ends in Dramatic Fashion",
    description: "Unexpected victory in championship final leads to celebrations across the city.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=4",
    publishedAt: new Date().toISOString(),
    source: { name: "Sports Network" },
    category: "sports"
  },
  {
    id: "5",
    title: "Economic Markets Show Strong Recovery",
    description: "Global markets demonstrate resilience with substantial gains across multiple sectors.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=5",
    publishedAt: new Date().toISOString(),
    source: { name: "Financial Times" },
    category: "business"
  }
];

export const categories = [
  "all",
  "technology",
  "environment",
  "health",
  "sports",
  "business"
] as const;

export type Category = (typeof categories)[number];