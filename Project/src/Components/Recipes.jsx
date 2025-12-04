import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const itemsPerPage = 7;

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  // Filter
  const filtered = recipes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort A–Z / Z–A
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">🍕 Recipes</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Sort */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="asc">Sort: A → Z</option>
        <option value="desc">Sort: Z → A</option>
      </select>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {paginated.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 flex gap-4 items-center shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">
                {item.cuisine} • {item.difficulty}
              </p>
              <p className="text-yellow-600 text-sm">⭐ {item.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">{page} / {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
