import { NewsArticle, mockNews, Category } from "@/data/mockNews";

// Interface for news sources
interface NewsSource {
  fetchNews(category: string): Promise<NewsArticle[]>;
}

// Functional approach for MockNewsSource
function createMockNewsSource(): NewsSource {
  return {
    async fetchNews(category: string): Promise<NewsArticle[]> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return category === "all"
        ? mockNews
        : mockNews.filter(article => article.category === category);
    },
  };
}

// Functional approach for The Guardian
function createGuardianSource(apiKey: string): NewsSource {
  return {
    async fetchNews(category: string): Promise<NewsArticle[]> {
      try {
        const response = await fetch(
          `https://content.guardianapis.com/${category}?api-key=${apiKey}&show-fields=all`
        );
        const data = await response.json();
        return data.response?.results?.map((item: any) => ({
          id: item.id,
          title: item.webTitle,
          description: item.fields?.trailText || "",
          url: item.webUrl,
          urlToImage: item.fields?.thumbnail || "",
          publishedAt: item.webPublicationDate,
          source: { name: "The Guardian" },
          category: category,
          author: item.fields?.byline || "Unknown",
        })) || [];
      } catch (error) {
        console.error("Error fetching from The Guardian:", error);
        throw error;
      }
    },
  };
}

// Functional approach for New York Times
function createNYTimesSource(apiKey: string): NewsSource {
  return {
    async fetchNews(category: string): Promise<NewsArticle[]> {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
        );
        const data = await response.json();
        return data.results?.map((item: any) => ({
          id: item.uri,
          title: item.title,
          description: item.abstract,
          url: item.url,
          urlToImage: item.multimedia?.[0]?.url || "",
          publishedAt: item.published_date,
          source: { name: "New York Times" },
          category: category,
          author: item.byline?.replace("By ", "") || "Unknown",
        })) || [];
      } catch (error) {
        console.error("Error fetching from NYT:", error);
        throw error;
      }
    },
  };
}

// Functional approach for NewsAPI
function createNewsAPISource(apiKey: string): NewsSource {
  return {
    async fetchNews(category: string): Promise<NewsArticle[]> {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
        );
        const data = await response.json();
        return data.articles?.map((item: any, idx: number) => ({
          id: `newsapi-${idx}`,
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage,
          publishedAt: item.publishedAt,
          source: { name: item.source?.name || "NewsAPI" },
          category: category,
          author: item.author || "Unknown",
        })) || [];
      } catch (error) {
        console.error("Error fetching from NewsAPI:", error);
        throw error;
      }
    },
  };
}

// Create a functional NewsService with fallback to mock data
function createNewsService(...sources: NewsSource[]) {
  return {
    async fetchNews(category: Category): Promise<NewsArticle[]> {
      try {
        // Aggregate results from multiple sources
        const results = await Promise.all(sources.map(src => src.fetchNews(category)));
        return results.flat();
      } catch (error) {
        console.error("Error in NewsService:", error); return undefined;
        return createMockNewsSource().fetchNews(category);
      }
    },
  };
}

// Use three APIs according to business requirements
const guardianSource = createGuardianSource(import.meta.env.VITE_GUARDIAN_API_KEY);
const nyTimesSource = createNYTimesSource(import.meta.env.VITE_NYT_API_KEY);
const newsAPISource = createNewsAPISource(import.meta.env.VITE_NEWS_API_KEY);

// Functional news service uses the chosen sources
const newsService = createNewsService(guardianSource, nyTimesSource, newsAPISource);

export function fetchNews(category: Category): Promise<NewsArticle[]> {
  return newsService.fetchNews(category);
}