import { useState } from "react";

const BookmarkButton = () => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <button
      className="mt-2 text-sm text-blue-600"
      onClick={() => setBookmarked(!bookmarked)}
    >
      {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
};

export default BookmarkButton;
