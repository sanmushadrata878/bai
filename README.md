# 🕐 Digital Clock - Multiple Time Zones

A beautiful, responsive digital clock application that displays the current time across different time zones around the world.

## Features

✨ **Key Features:**
- 🌍 Displays time in 8 major cities/time zones
- 🔄 Real-time updates every second
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Beautiful gradient background with modern UI
- 🕰️ Shows your local time and date
- ⏱️ Uses JavaScript Intl API for accurate timezone handling
- 📝 Clean, readable digital font

## Supported Time Zones

1. **New York** (EST) - UTC-5
2. **London** (GMT) - UTC+0
3. **Paris** (CET) - UTC+1
4. **Dubai** (GST) - UTC+4
5. **Tokyo** (JST) - UTC+9
6. **Sydney** (AEDT) - UTC+11
7. **Los Angeles** (PST) - UTC-8
8. **Singapore** (SGT) - UTC+8

## Files

- `index.html` - Main HTML structure with clock cards
- `styles.css` - Styling and responsive design
- `script.js` - Clock logic and timezone handling
- `README.md` - Documentation

## How to Use

1. Open `index.html` in your web browser
2. The clocks will automatically display and update every second
3. Your local time is shown at the bottom

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript ES6** - Intl API for timezone handling
- **No Dependencies** - Pure vanilla JavaScript

## Browser Support

Works on all modern browsers that support:
- Intl.DateTimeFormat API
- CSS Grid and Flexbox
- ES6 JavaScript

## Customization

To add more time zones, edit the `timezones` array in `script.js`:

```javascript
const timezones = [
    { id: 'your-id', name: 'Continent/City', label: 'City Name (TZ)' },
    // Add more timezones here
];
```

Then add corresponding clock card in `index.html`:

```html
<div class="clock-card">
    <div class="timezone-label">City Name (TZ)</div>
    <div class="clock-display" id="clock-your-id">--:--:-- --</div>
    <div class="timezone-info">UTC±X</div>
</div>
```

## Features Explanation

### Real-time Updates
- Clock updates every 1000ms (1 second)
- Uses `setInterval()` for continuous updates

### Timezone Handling
- Uses JavaScript's `Intl.DateTimeFormat` API
- Accurate handling of daylight saving time
- Works across all major browsers

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Works on screens from 320px to 4K+

## Performance

- Minimal CPU usage
- No external API calls
- Lightweight and fast loading
- Smooth animations

## License

This project is open source and available for personal and commercial use.

## Future Enhancements

- [ ] Add more time zones
- [ ] Dark/Light mode toggle
- [ ] Custom timezone selection
- [ ] Time format toggle (12h/24h)
- [ ] Audio alarm functionality
- [ ] Weather integration
