import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="mb-4 sm:mb-6 relative">
      <input
        type="text"
        placeholder="Search workshops..."
        className="w-full p-3 pl-10 rounded-full border bg-white"
      />
      <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}