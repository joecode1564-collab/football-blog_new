# Football Blog Design Specification

## Overview
- **Blog Focus**: General football news for casual fans
- **Target Audience**: Casual football fans
- **Content Types**: Match reports/previews, transfer news, live match information
- **Design Style**: Dark mode
- **Color Approach**: To be determined with surprising elements

## Core Design Principles

1. **Accessibility First**: Ensure readability in dark mode with proper contrast
2. **Mobile-First Approach**: Optimize for mobile viewing as primary access point
3. **Fast Loading**: Prioritize performance for quick access to football news
4. **Scannable Layout**: Easy to digest for casual fans wanting quick updates
5. **Visual Hierarchy**: Clear distinction between different content types

## Color Scheme (Dark Mode Surprise)

Primary Colors:
- Background: #0a0a0a (Near black for true dark mode)
- Surface: #1a1a1a (Slightly lighter for cards/containers)
- Primary Accent: #ff6b35 (Vibrant orange-red for highlights and CTAs)
- Secondary Accent: #4ecdc4 (Teal/cyan for secondary highlights)
- Text Primary: #ffffff (Pure white for main text)
- Text Secondary: #b0b0b0 (Light gray for secondary text)
- Border/Divider: #333333 (Subtle dark borders)

## Typography

- **Headings**: Inter Bold, -apple-system, BlinkMacSystemFont, sans-serif
- **Body Text**: Inter Regular, -apple-system, BlinkMacSystemFont, sans-serif
- **Font Weights**: 
  - Headings: 700 (Bold)
  - Subheadings: 600 (Semi-bold)
  - Body: 400 (Regular)
  - Captions: 300 (Light)

Font Sizes:
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.75rem (28px)
- H4: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

## Layout Structure

### Header
- Site logo/name on left
- Navigation menu on right (compact for mobile)
- Search bar accessible via icon
- Dark mode toggle (if user preference needs to be overridden)

### Main Content Area
- **Hero Section**: Featured article or breaking news
- **Article Grid**: Mixed content layout showing different post types
- **Sidebar** (desktop only): 
  - Live match updates
  - Trending topics
  - Newsletter signup
  - Social media links

### Article Template
- Featured image (full width, dark overlay for text readability)
- Article title (prominent, clear hierarchy)
- Meta information (author, time, tags - subtle but readable)
- Article excerpt/summary
- Read more button/CTA

### Match Report/Preview Specific Elements
- Team logos vs. each other
- Match time/date/venue prominently displayed
- Predicted lineups or actual lineups (for reports)
- Key player to watch section
- Live score updates (for ongoing matches)
- Where to watch information (stadium/broadcast/streaming)

### Transfer News Specific Elements
- Player photo with club transition visualization
- Transfer fee (if known) or "Undisclosed"
- Contract details
- Player stats summary
- Club comparison (leaving vs. joining)

### Live Match Information
- Real-time score updates
- Match timeline (goals, cards, substitutions)
- Possession statistics
- Shot statistics
- Commentary feed

## Components

### Navigation
- Mobile: Hamburger menu expanding to full-screen overlay
- Desktop: Horizontal menu with dropdowns for leagues/competitions
- Sticky on scroll (becomes more compact)

### Article Cards
- Image overlay with category badge
- Title truncation for consistent card heights
- Read time indicator
- Engagement metrics (comments/views - optional)

### Footer
- Site information
- Newsletter signup
- Social media links
- Legal links (privacy, terms)
- Copyright

## Special Features

### Live Match Tracker
- Minimalist design that doesn't distract from article reading
- Expandable/collapsible for detailed stats
- Team colors incorporated subtly
- Auto-refresh capability

### Newsletter Integration
- Prominent but not intrusive signup in sidebar
- Exit-intent popup (optional, frequency-controlled)
- Welcome series for new subscribers

### Social Sharing
- Floating share bar (optional)
- Inline sharing options at article end
- Platform-specific optimization (Twitter for quick takes, Facebook for longer pieces)

### Search Functionality
- Predictive search as user types
- Filter by content type (matches, transfers, etc.)
- Date range filtering
- Team/player specific search

## Technical Considerations

### Performance
- Lazy loading for images
- Minimal CSS/JS footprint
- Browser caching optimization
- CDN for asset delivery

### SEO
- Structured data for articles (NewsArticle schema)
- Proper heading hierarchy
- Meta descriptions for all pages
- XML sitemap generation

### Accessibility (WCAG 2.1 AA)
- Color contrast ratios meeting standards
- Keyboard navigable interface
- Screen reader friendly
- ARIA labels where necessary
- Focus visible indicators

## Content Organization

### Categories
- Premier League
- La Liga
- Bundesliga
- Serie A
- Ligue 1
- Champions League
- Europa League
- International Football
- Transfer News
- Features/Analysis

### Tags System
- Team-specific tags
- Player-specific tags
- Competition tags
- Content type tags (match-report, transfer, analysis, etc.)

## Monetization Considerations (Future)
- Non-intrusive ad placements
- Sponsored content sections
- Affiliate links for merchandise/streaming services
- Premium subscription option (optional)

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Implementation Priority
1. Core layout and typography
2. Article templates
3. Navigation system
4. Match-specific components
5. Transfer news components
6. Live match tracker
7. Sidebar/widgets
8. Footer
9. Search functionality
10. Special features (newsletter, social sharing)