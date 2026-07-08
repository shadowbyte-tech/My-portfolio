'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'

interface EnhancedPortfolioCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  index: number
}

export default function EnhancedPortfolioCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  featured = false,
  index
}: EnhancedPortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.1] bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/30 hover:shadow-[0_0_60px_rgba(251,191,36,0.1)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
          >
            Featured
          </motion.div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex gap-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-amber-400 hover:text-black transition-colors duration-300"
              >
                <Github size={20} />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-amber-400 hover:text-black transition-colors duration-300"
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
              className="px-3 py-1 rounded-full bg-zinc-800/50 border border-white/10 text-xs text-zinc-300 hover:border-amber-400/30 hover:text-amber-400 transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
          {tags.length > 4 && (
            <span className="px-3 py-1 rounded-full bg-zinc-800/30 border border-white/5 text-xs text-zinc-500">
              +{tags.length - 4}
            </span>
          )}
        </div>

        {/* View Details Link */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span>View Details</span>
          <ArrowUpRight size={16} />
        </motion.div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/10 via-transparent to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  )
}
