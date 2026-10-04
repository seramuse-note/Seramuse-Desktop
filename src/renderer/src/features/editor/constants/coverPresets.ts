export interface CoverPreset {
  id: string
  label: string
  gradient: string
}

export const COVER_PRESETS: CoverPreset[] = [
  {
    id: 'sunset',
    label: 'Sunset Glow',
    gradient: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)'
  },
  {
    id: 'aurora',
    label: 'Aurora Night',
    gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
  },
  {
    id: 'lavender',
    label: 'Lavender Dream',
    gradient: 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)'
  },
  {
    id: 'ocean',
    label: 'Ocean Breeze',
    gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)'
  },
  {
    id: 'emerald',
    label: 'Emerald Forest',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    id: 'midnight',
    label: 'Midnight Slate',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)'
  },
  {
    id: 'peach',
    label: 'Warm Peach',
    gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)'
  },
  {
    id: 'neon',
    label: 'Cyberpunk Neon',
    gradient: 'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)'
  }
]
