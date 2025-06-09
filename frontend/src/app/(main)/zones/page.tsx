import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function ZonesPage() {
  // 2. Fetch from your view
  const { data: zones, error } = await supabase
    .from('zone_cards')
    .select('*')
    .order('zone_name', { ascending: true });

  if (error) {
    throw new Error('Failed to load zones');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Explore Zones
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover and manage your zones with our intuitive dashboard
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium">
                {zones.length} Active Zones
              </span>
            </div>
            <div className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zones.map((zone, idx) => (
            <Link
              key={idx}
              href={`/zones/${encodeURIComponent(zone.id)}`}
              className="group block transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                {/* Gradient Top Bar */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Zone Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {zone.zone_name}
                      </h3>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-500">{zone.region_name}</span>
                      </div>
                    </div>
                    <div className="ml-4 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {zone.description?.slice(0, 100) || 'No description available for this zone.'}
                    {zone.description && zone.description.length > 100 && '...'}
                  </p>

                  {/* Zone Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        {/* Region */}
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Region</p>
                        <p className="text-sm font-semibold text-slate-700">{zone.region_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        {/* Address */}
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Address</p>
                        <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                          {zone.address || 'Address not specified'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                        {/* Owner */}
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.969 9.969 0 0112 15c2.657 0 5.065.977 6.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Owner</p>
                        <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                          {zone.owner_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        {/* Times */}
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                          <circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={2} fill="none" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Open - Close</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {(zone.open_time && zone.close_time)
                            ? `${zone.open_time.slice(0, 5)} - ${zone.close_time.slice(0, 5)}`
                            : 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Click to view details</span>
                      <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-700">
                        <span className="text-sm font-medium">View Details</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {zones.length === 0 && (
          <div className="text-center py-12">
            {/* ...empty state... */}
          </div>
        )}
      </div>
    </div>
  );
}
