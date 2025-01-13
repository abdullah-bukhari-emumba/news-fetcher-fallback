export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id?: string;
    name: string;
  };
  category: string;
  author?: string;
}

export const categories = [
  // "all",
  "technology",
  "environment",
  "health",
  "sports",
  "business",
  "politics",
  "entertainment"
] as const;

export type Category = (typeof categories)[number];

export const sources = [
  "BBC News",
  "The Guardian",
  "New York Times",
  "Tech Daily",
  "Health Weekly",
  "Sports Network",
  "Financial Times"
] as const;

export type Source = (typeof sources)[number];

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Tech Giants Announce Breakthrough in Quantum Computing",
    description: "Major technology companies have achieved a significant milestone in quantum computing, promising to revolutionize data processing.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=1",
    publishedAt: "2024-02-20T10:30:00Z",
    source: { id: "tech-daily", name: "Tech Daily" },
    category: "technology",
    author: "John Smith"
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders have come together to sign a groundbreaking climate accord aimed at reducing carbon emissions.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=2",
    publishedAt: "2024-02-19T15:45:00Z",
    source: { id: "bbc-news", name: "BBC News" },
    category: "environment",
    author: "Emma Johnson"
  },
  {
    id: "3",
    title: "Revolutionary Medical Treatment Shows Promise",
    description: "Scientists develop new treatment method that could transform the way we approach certain diseases.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=3",
    publishedAt: "2024-02-18T08:15:00Z",
    source: { id: "health-weekly", name: "Health Weekly" },
    category: "health",
    author: "Dr. Sarah Chen"
  },
  {
    id: "4",
    title: "Historic Victory in Championship Final",
    description: "Unexpected victory in championship final leads to celebrations across the city.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=4",
    publishedAt: "2024-02-17T22:00:00Z",
    source: { id: "sports-network", name: "Sports Network" },
    category: "sports",
    author: "Mike Thompson"
  },
  {
    id: "5",
    title: "Markets Show Strong Recovery Post-Pandemic",
    description: "Global markets demonstrate resilience with substantial gains across multiple sectors.",
    url: "#",
    urlToImage: "https://picsum.photos/800/400?random=5",
    publishedAt: "2024-02-16T14:20:00Z",
    source: { id: "financial-times", name: "Financial Times" },
    category: "business",
    author: "Alexandra White"
  }
];