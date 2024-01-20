import { useState } from "react";

const usePagination = <T>(
  content: T[]
): {
  paginatedContent: T[];
  showMore: () => void;
  hasMore: boolean;
} => {
  const perPage = 5;
  const [page, setPage] = useState(1);

  return {
    paginatedContent: content.slice(0, page * perPage),
    showMore: () => setPage(page + 1),
    hasMore: content.length > page * perPage,
  };
};

export default usePagination;
