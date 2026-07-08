'use client'

interface MarqueeItem {
  text: string
  icon?: string
}

interface MarqueeFooterProps {
  items: MarqueeItem[]
  className?: string
}

export default function MarqueeFooter({ items, className = '' }: MarqueeFooterProps) {
  return (
    <div className={className} style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        minWidth: '200%',
        animation: 'marquee-scroll 10s linear infinite'
      }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            {items.map((item, index) => (
              <div key={`${i}-${index}`} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#fff'
                }}>{item.text}</span>
                {item.icon && <span style={{ fontSize: '3rem' }}>{item.icon}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
