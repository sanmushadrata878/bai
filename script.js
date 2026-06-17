// Time zone configurations
const timezones = [
    { id: 'ny', name: 'America/New_York', label: 'New York (EST)' },
    { id: 'london', name: 'Europe/London', label: 'London (GMT)' },
    { id: 'paris', name: 'Europe/Paris', label: 'Paris (CET)' },
    { id: 'dubai', name: 'Asia/Dubai', label: 'Dubai (GST)' },
    { id: 'tokyo', name: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { id: 'sydney', name: 'Australia/Sydney', label: 'Sydney (AEDT)' },
    { id: 'la', name: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
    { id: 'singapore', name: 'Asia/Singapore', label: 'Singapore (SGT)' }
];

/**
 * Format time with leading zeros
 * @param {number} num - Number to format
 * @returns {string} - Formatted string with leading zero if needed
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Get formatted time for a specific timezone
 * @param {string} timezone - Timezone name (e.g., 'America/New_York')
 * @returns {string} - Formatted time string
 */
function getTimeInTimezone(timezone) {
    try {
        // Create a date object with the timezone
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: timezone
        };

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(date);

        let hour = '', minute = '', second = '', meridiem = '';

        for (let part of parts) {
            if (part.type === 'hour') hour = part.value;
            if (part.type === 'minute') minute = part.value;
            if (part.type === 'second') second = part.value;
            if (part.type === 'dayPeriod') meridiem = part.value;
        }

        return `${hour}:${minute}:${second} ${meridiem}`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return '--:--:-- --';
    }
}

/**
 * Get formatted date for a specific timezone
 * @param {string} timezone - Timezone name
 * @returns {string} - Formatted date string
 */
function getDateInTimezone(timezone) {
    try {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: timezone
        };

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Loading...';
    }
}

/**
 * Update all timezone clocks
 */
function updateClocks() {
    timezones.forEach(tz => {
        const element = document.getElementById(`clock-${tz.id}`);
        if (element) {
            element.textContent = getTimeInTimezone(tz.name);
        }
    });

    // Update local time and date
    const localTimeElement = document.getElementById('local-time');
    const localDateElement = document.getElementById('local-date');

    if (localTimeElement) {
        const now = new Date();
        const hours = padZero(now.getHours());
        const minutes = padZero(now.getMinutes());
        const seconds = padZero(now.getSeconds());
        const meridiem = now.getHours() >= 12 ? 'PM' : 'AM';
        localTimeElement.textContent = `${hours}:${minutes}:${seconds} ${meridiem}`;
    }

    if (localDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date();
        localDateElement.textContent = date.toLocaleDateString('en-US', options);
    }
}

/**
 * Initialize the clock
 */
function initClock() {
    // Update immediately on load
    updateClocks();

    // Update every second
    setInterval(updateClocks, 1000);
}

// Start the clock when DOM is ready
document.addEventListener('DOMContentLoaded', initClock);

// Also start if script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
} else {
    initClock();
}
