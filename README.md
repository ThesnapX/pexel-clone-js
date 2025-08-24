# Pexels Clone

A fully responsive photo gallery application inspired by [Pexels](https://www.pexels.com/).  
Built with **HTML, CSS, and Vanilla JavaScript**, it allows users to explore curated photos, search for images, filter by orientation, and view/download high-quality images.

## Live Demo

https://pexel-clone-js.netlify.app/

## Features

- Infinite scroll photo feed (curated by Pexels API)
- Search functionality for images (real-time via Pexels API)
- Orientation filter: Mix (default), Horizontal, Vertical
- Image modal view with:
  - Enlarged photo
  - Photographer name and initials avatar
  - Link to photographer profile
  - Download button for original image
- Sticky navbar with:
  - Hero search (visible on landing only)
  - Nav search (appears after hero leaves viewport)
  - Auto-hide on scroll up, reappear on scroll down
- Responsive design for all screen sizes
- Smooth loader animation while fetching data

## Technologies Used

- **HTML5** for structure
- **SCSS (compiled to CSS3)** for styling and responsiveness
- **JavaScript (ES6+)** for dynamic features and API handling
- **Pexels API** for fetching photos

## Project Inspiration

This project was built to practice DOM manipulation, API integration, and modern UI/UX interactions (infinite scroll, sticky nav, filters, modal view).

## How to Use

1. Open the app in your browser.
2. Scroll to explore curated photos (loads automatically).
3. Use the search bar to find specific photos.
4. Apply orientation filters (Mix, Horizontal, Vertical).
5. Click any photo to:
   - View it larger
   - Check photographer details
   - Download the image

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd pexels-clone
   ```
2. Open `index.html` in your browser or serve with Live Server.
3. Replace the placeholder API key in `script.js` with your own from [Pexels API](https://www.pexels.com/api/).

## API Reference

- Uses the **Pexels API**.
- Sign up for a free API key and add it to `script.js`:
  ```js
  const apiKey = "YOUR_API_KEY_HERE";
  ```

## File Structure

```
pexels-clone/
├── index.html
├── style.scss      # main styling (compiled to style.css)
├── style.css       # compiled CSS file
├── script.js       # main JavaScript file
├── assets/
│   ├── icons/      # any custom icons
│   └── images/     # optional static images
```

## Future Enhancements

- Add category-based filtering (Nature, Technology, People, etc.)
- Add "Load More" button as fallback for infinite scroll
- Dark/Light theme toggle
- User authentication (save favorites)

## License

MIT License

## Acknowledgments

- [Pexels API](https://www.pexels.com/api/) for providing free stock images
- Material Symbols for icons
- Inspiration from the real [Pexels](https://www.pexels.com/) design
