export default function Collections() {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-3 auto-rows-auto gap-4">
        {/* Upload Card */}
        <div className="bg-gray-100 p-6 rounded-3xl aspect-square row-span-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium mb-2">My Collection</h3>
              <p className="text-sm text-gray-600">
                Upload photo of philatelic material you own and flaunt your treasuric collection!
              </p>
            </div>
            <button className="self-end bg-white rounded-full p-2 shadow-sm">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Large Center Item */}
        <div className="bg-gray-100 rounded-3xl aspect-[4/5] col-span-1 row-span-2"></div>

        {/* Regular Items */}
        <div className="bg-gray-100 rounded-3xl aspect-square"></div>
        <div className="bg-gray-100 rounded-3xl aspect-square"></div>
        <div className="bg-gray-100 rounded-3xl aspect-square"></div>
        <div className="bg-gray-100 rounded-3xl aspect-square"></div>
      </div>
    </div>
  )
}