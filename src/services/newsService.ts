import { NewsArticle, mockNews } from "@/data/mockNews";

const API_KEY = "YOUR_NEWS_API_KEY"; // Replace with actual API key if available
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export async function fetchNews(category: string = "general"): Promise<NewsArticle[]> {
  try {
    // Simulate API call (replace with actual API call when key is available)
    // const response = await fetch(`${BASE_URL}?country=us&category=${category}&apiKey=${API_KEY}`);
    // const data = await response.json();
    
    // For now, return mock data filtered by category
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    if (category === "all") {
      return mockNews;
    }
    
    return mockNews.filter(article => article.category === category);
  } catch (error) {
    console.error("Error fetching news:", error);
    return mockNews; // Fallback to mock data
  }
}