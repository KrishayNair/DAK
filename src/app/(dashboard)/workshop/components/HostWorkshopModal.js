import { XMarkIcon } from "@heroicons/react/24/outline";

export default function HostWorkshopModal({ isOpen, onClose, formData, onSubmit, onChange }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Host a Workshop</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-8">
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="w-full p-3 border rounded-lg h-32 text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={onChange}
                className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={onChange}
                className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={onChange}
                className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mode
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={onChange}
              className="w-full p-3 border rounded-lg text-base focus:ring-2 focus:ring-[#B85C38] focus:border-transparent"
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="sticky bottom-0 bg-white pt-6 border-t mt-8">
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50 w-full sm:w-auto text-base font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B85C38] text-white rounded-lg hover:bg-[#A04B2D] w-full sm:w-auto text-base font-medium"
              >
                Create Workshop
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}