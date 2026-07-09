'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Eye, Download, MessageSquare, TrendingUp, Sparkles, BarChart2 } from 'lucide-react'

const STATS = [
  { name: "Portfolio Visits", value: "1,482", change: "+12.4%", icon: Eye, color: "#00F5FF" },
  { name: "Resume Downloads", value: "318", change: "+8.2%", icon: Download, color: "#7C3AED" },
  { name: "Project Views", value: "894", change: "+15.1%", icon: BarChart2, color: "#00F5FF" },
  { name: "Inbound Messages", value: "24", change: "+4.0%", icon: MessageSquare, color: "#7C3AED" }
]

const POPULAR_PROJECTS = [
  { name: "AS Trusted Consultancy", views: 420, rate: "47%" },
  { name: "Personal AI Agent System", views: 312, rate: "35%" },
  { name: "Ninjas System UI", views: 162, rate: "18%" }
]

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-12 pt-10">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Analytics Dashboard.</h1>
          <p className="text-zinc-450 text-xs md:text-sm mt-2">Real-time metrics tracking client discovery and actions</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-green-400 font-semibold shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Analytics Core Active</span>
        </div>
      </section>

      {/* Grid of stats */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
          const StatIcon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-450 font-bold">{stat.name}</span>
                <div 
                  className="p-2 rounded-xl bg-white/5 border border-white/5" 
                  style={{ color: stat.color }}
                >
                  <StatIcon size={16} />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-[10px] text-green-400 font-bold font-mono">{stat.change} this month</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Grid: Charts & Project Breakdown */}
      <section className="grid md:grid-cols-3 gap-8">
        
        {/* Mock Chart Visualizer */}
        <div className="glass-card p-8 md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#00F5FF]" />
            Monthly Visits Projection
          </h3>
          
          {/* Simple CSS bars */}
          <div className="h-48 flex items-end gap-3 pt-6 border-b border-white/5 pb-2">
            {[30, 45, 60, 40, 75, 90, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                <div className="text-[8px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 15}
                </div>
                <div 
                  className="w-full bg-gradient-to-t from-[#7C3AED]/20 to-[#00F5FF]/80 rounded-t-lg group-hover:brightness-110 transition-all origin-bottom"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-zinc-500 font-mono">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project metrics breakdown */}
        <div className="glass-card p-8 space-y-6">
          <h3 className="text-lg font-bold text-white">Popular Content</h3>
          
          <div className="space-y-5">
            {POPULAR_PROJECTS.map((proj, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300 truncate pr-2">{proj.name}</span>
                  <span className="text-zinc-450 font-mono">{proj.views} views</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] rounded-full" 
                    style={{ width: proj.rate }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  )
}
