module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Configure autoprefixer to add vendor prefixes for older browsers
      flexbox: 'no-2009', // More conservative flexbox prefixing
      grid: 'autoplace', // Enable CSS Grid prefixing for IE
      overrideBrowserslist: [
        // Target browsers based on global usage statistics
        '> 1%', // Browsers with more than 1% global usage
        'last 2 versions', // Last 2 versions of each browser
        'Firefox ESR', // Extended Support Release of Firefox
        'not dead', // Exclude browsers without official support or updates
        'not IE 11', // Exclude IE 11 (we'll handle it separately with polyfills)
        'not op_mini all', // Exclude Opera Mini
      ],
    },
  },
}
