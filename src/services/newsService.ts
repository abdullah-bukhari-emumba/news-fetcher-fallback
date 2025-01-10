import { NewsArticle, mockNews, Category } from "@/data/mockNews";

// Interface segregation principle - separate interfaces for different types of news sources
interface NewsSource {
  fetchNews(category: string): Promise<NewsArticle[]>;
}

// Single responsibility principle - each class has one responsibility
class MockNewsSource implements NewsSource {
  async fetchNews(category: string): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return category === "all" ? mockNews : mockNews.filter(article => article.category === category);
  }
}

class APINewsSource implements NewsSource {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async fetchNews(category: string): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?country=us&category=${category}&apiKey=${this.apiKey}`
      );
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching from API:", error);
      throw error;
    }
  }
}

// Open/closed principle - we can add new news sources without modifying existing code
class NewsService {
  private newsSource: NewsSource;

  constructor(newsSource: NewsSource) {
    this.newsSource = newsSource;
  }

  async fetchNews(category: Category): Promise<NewsArticle[]> {
    try {
      return await this.newsSource.fetchNews(category);
    } catch (error) {
      console.error("Error in NewsService:", error);
      // Fallback to mock data if API fails
      const mockSource = new MockNewsSource();
      return mockSource.fetchNews(category);
    }
  }
}

// Dependency inversion - we depend on abstractions, not concrete implementations
const newsService = new NewsService(new MockNewsSource());

export const fetchNews = (category: Category): Promise<NewsArticle[]> => {
  return newsService.fetchNews(category);
};