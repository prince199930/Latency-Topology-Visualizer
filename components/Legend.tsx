'use client';

export function Legend() {
  return (
    <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-4 shadow-xl border border-gray-700 z-10">
      <h3 className="font-bold text-sm mb-3">Legend</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium mb-2">Cloud Providers</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF9900]"></div>
              <span className="text-xs">AWS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4285F4]"></div>
              <span className="text-xs">GCP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0078D4]"></div>
              <span className="text-xs">Azure</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium mb-2">Latency</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-green-500 rounded"></div>
              <span className="text-xs">&lt; 50ms (Low)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-yellow-500 rounded"></div>
              <span className="text-xs">50-150ms (Medium)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-red-500 rounded"></div>
              <span className="text-xs">&gt; 150ms (High)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
