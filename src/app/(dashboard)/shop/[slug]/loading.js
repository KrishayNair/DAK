import React from "react";

export default function Loading() {
    return (
        <div className="min-h-screen w-full bg-white">
            <div className="w-full bg-[#FDF6EC] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-64 bg-gray-200 rounded-lg"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 