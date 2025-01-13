import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { SourceFilter } from "@/components/SourceFilter";
import { fetchNews } from "@/services/newsService";
import { Category, Source } from "@/data/mockNews";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { DateRange } from "react-day-picker";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("technology");
  const [selectedSource, setSelectedSource] = useState<Source | "All Sources">("All Sources");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: news, isLoading } = useQuery({
    queryKey: ["news", selectedCategory, selectedSource, searchTerm, dateRange],
    queryFn: () => fetchNews(selectedCategory),
  });

  const filteredNews = news?.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = selectedSource === "All Sources" || article.source.name === selectedSource;
    
    const matchesDate = !dateRange?.from || !dateRange?.to || (
      isAfter(parseISO(article.publishedAt), dateRange.from) &&
      isBefore(parseISO(article.publishedAt), dateRange.to)
    );

    return matchesSearch && matchesSource && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="flex gap-4 flex-wrap">
            <SourceFilter selectedSource={selectedSource} onSourceChange={setSelectedSource} />
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews?.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;