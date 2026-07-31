// =============================================================================
// Centralized icon library. Each icon is defined as raw inner SVG markup on a
// 24×24 viewBox. `BaseIcon` renders these with `currentColor`, so icons inherit
// text colour and stay consistent. `fill` icons (brand glyphs) paint solid;
// everything else is a 1.6px stroke line icon.
// =============================================================================

export interface IconDef {
  /** Inner SVG markup (paths/lines/etc). */
  body: string
  /** Paint mode. Line icons stroke; brand/solid glyphs fill. */
  mode?: 'stroke' | 'fill'
}

export const iconPaths: Record<string, IconDef> = {
  // — UI / navigation —
  'arrow-right': { body: '<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>' },
  'arrow-left': { body: '<line x1="20" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/>' },
  'arrow-up-right': { body: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/>' },
  'chevron-down': { body: '<polyline points="6 9 12 15 18 9"/>' },
  'chevron-right': { body: '<polyline points="9 6 15 12 9 18"/>' },
  close: { body: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>' },
  menu: { body: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>' },
  search: { body: '<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>' },
  filter: { body: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>' },
  check: { body: '<polyline points="4 12 9 17 20 6"/>' },
  'check-circle': { body: '<circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/>' },
  globe: { body: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>' },
  star: { body: '<polygon points="12 3 14.6 9 21 9.6 16 13.9 17.6 20.2 12 16.7 6.4 20.2 8 13.9 3 9.6 9.4 9"/>', mode: 'fill' },

  // — trust / value —
  shield: { body: '<path d="M12 3 20 6v6c0 5-3.6 7.6-8 9-4.4-1.4-8-4-8-9V6z"/>' },
  document: { body: '<rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>' },
  lock: { body: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' },
  eye: { body: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>' },
  card: { body: '<rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  sparkles: { body: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18 15l.7 1.8L20.5 17.5l-1.8.7L18 20l-.7-1.8L15.5 17.5l1.8-.7z"/>' },
  chat: { body: '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4z"/>' },
  key: { body: '<circle cx="7.5" cy="15.5" r="4"/><line x1="10.5" y1="12.5" x2="20" y2="3"/><line x1="16" y1="7" x2="19" y2="10"/>' },
  quote: { body: '<path d="M7 6h4v6c0 2.2-1.3 3.6-3.6 4.4M13 6h4v6c0 2.2-1.3 3.6-3.6 4.4"/>' },
  handshake: { body: '<path d="M8 11 5 8 2 11v4l3 3 2-2"/><path d="M16 11l3-3 3 3v4l-3 3-2-2"/><path d="M7 13l3 3 2-1 2 1 3-3"/>' },

  // — car specs —
  gauge: { body: '<path d="M4 16a8 8 0 1 1 16 0"/><line x1="12" y1="14" x2="16" y2="10"/><circle cx="12" cy="14" r="1.4" fill="currentColor"/>' },
  bolt: { body: '<path d="M13 2 4 14h7l-1 8 10-13h-7z"/>' },
  fuel: { body: '<rect x="4" y="4" width="9" height="17" rx="2"/><line x1="4" y1="10" x2="13" y2="10"/><path d="M13 8h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3"/>' },
  road: { body: '<path d="M6.5 21 9 3M17.5 21 15 3"/><line x1="12" y1="5" x2="12" y2="8"/><line x1="12" y1="11" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="20"/>' },
  calendar: { body: '<rect x="4" y="5" width="16" height="16" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><line x1="9" y1="3" x2="9" y2="6"/><line x1="15" y1="3" x2="15" y2="6"/>' },
  seat: { body: '<path d="M7 4h3a2 2 0 0 1 2 2v6H9a2 2 0 0 1-2-2z"/><path d="M7 14h8a2 2 0 0 1 2 2v4"/><line x1="6" y1="20" x2="6" y2="15"/>' },
  gear: { body: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>' },
  palette: { body: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-1 1-1.8-.6-1 .1-2.2 1.3-2.2H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="7.5" cy="12" r="1.1" fill="currentColor"/><circle cx="10" cy="8" r="1.1" fill="currentColor"/><circle cx="15" cy="8.5" r="1.1" fill="currentColor"/>' },

  // — contact —
  mail: { body: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>' },
  location: { body: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>' },
  clock: { body: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>' },
  user: { body: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' },

  // — brand glyphs (filled) —
  instagram: {
    mode: 'fill',
    body: '<path d="M12 2.2c-2.7 0-3 0-4 .1-1.1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1-.5.6-.9 1.1-1.1 1.8-.3.6-.4 1.3-.5 2.4C2.2 9 2.2 9.3 2.2 12s0 3 .1 4c0 1.1.2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.3.4 2.4.5 1 .1 1.3.1 4 .1s3 0 4-.1c1.1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.4-1.3.5-2.4.1-1 .1-1.3.1-4s0-3-.1-4c0-1.1-.2-1.8-.5-2.4-.2-.7-.6-1.2-1.1-1.8-.6-.5-1.1-.9-1.8-1.1-.6-.3-1.3-.4-2.4-.5-1-.1-1.3-.1-4-.1zm0 1.8c2.7 0 3 0 4 .1 1 0 1.5.2 1.9.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.4.3.9.3 1.9.1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.4.1-.9.3-1.9.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.5-.2-1.9-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.1-.4-.3-.9-.3-1.9-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.5.3-1.9.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.4-.1.9-.3 1.9-.3 1-.1 1.3-.1 4-.1z"/><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4z"/><circle cx="17.2" cy="6.8" r="1.2"/>',
  },
  youtube: {
    mode: 'fill',
    body: '<path d="M22.5 8.2a2.8 2.8 0 0 0-2-2C18.8 5.8 12 5.8 12 5.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12a29 29 0 0 0 .3 3.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .3-3.8 29 29 0 0 0-.3-3.8zM9.8 15.3V8.7l5.7 3.3z"/>',
  },
}

/** Ordered map of car-spec fields to their icons (used by CarSpecs). */
export const specIcons = {
  year: 'calendar',
  mileage: 'road',
  power: 'bolt',
  acceleration: 'gauge',
  fuel: 'fuel',
  transmission: 'gear',
  seats: 'seat',
  color: 'palette',
} as const
