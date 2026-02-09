import React from 'react';

const ResponsiveLayout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 xl:col-span-9">
            {children}
          </main>
          
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="sticky top-4 bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  Create Recipe
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  My Bookmarks
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  Browse Categories
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;