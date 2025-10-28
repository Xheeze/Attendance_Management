# Logo Setup for Attendance Management System

## Logo Implementation

The SPA is now configured to display a logo in the top-left corner of the header. Here's how it works:

### Current Setup

1. **Logo Location**: `/public/logo.svg` - A default SVG logo has been created
2. **Fallback System**: If the logo image fails to load, it shows a stylized "AS" badge
3. **Responsive Design**: Logo scales appropriately on mobile devices

### How to Add Your Custom Logo

#### Option 1: Replace the SVG file
1. Replace `/public/logo.svg` with your company's logo
2. Recommended dimensions: 120x40px (3:1 aspect ratio)
3. Formats supported: SVG, PNG, JPG, WebP

#### Option 2: Use a different file
1. Add your logo file to `/public/` directory (e.g., `company-logo.png`)
2. Update the `src` attribute in `src/components/Header/Header.jsx`:
   ```jsx
   <img 
     src="/company-logo.png" 
     alt="Company Logo" 
     className="logo-image"
     // ...
   />
   ```

#### Option 3: Use external URL
```jsx
<img 
  src="https://yourcompany.com/logo.png" 
  alt="Company Logo" 
  className="logo-image"
  // ...
/>
```

### Logo Specifications

- **Recommended size**: 120x40px (maximum)
- **Background**: Transparent or white (works best on blue header)
- **Format**: SVG preferred for crisp display at all sizes
- **Alternative formats**: PNG, JPG, WebP

### Customization Options

#### Update Company Text
In `src/components/Header/Header.jsx`, modify:
```jsx
<h1 className="header-title">Your Company Name</h1>
<span className="header-subtitle">Your Tagline</span>
```

#### Update Fallback Logo
Change the initials in the fallback:
```jsx
<span className="logo-text">YC</span>
```

#### Styling Customization
Modify `src/components/Header/Header.css`:
- `.logo-image` - Adjust logo size and spacing
- `.logo-fallback` - Style the fallback badge
- `.header-title-container` - Modify title and subtitle styling

### Features

✅ **Automatic Fallback**: Shows branded initials if logo fails to load  
✅ **Responsive Design**: Adapts to mobile screens  
✅ **Hover Effects**: Subtle animations on interaction  
✅ **High DPI Support**: Crisp display on retina screens  
✅ **Accessibility**: Proper alt text and keyboard navigation  

### Testing Your Logo

1. Place your logo file in `/public/`
2. Update the `src` attribute in Header.jsx
3. Restart your dev server: `npm start`
4. Check both desktop and mobile views
5. Test logo fallback by temporarily using a broken image path

### Troubleshooting

- **Logo not showing**: Check file path and ensure file exists in `/public/`
- **Logo too large/small**: Adjust `.logo-image` height in Header.css
- **Mobile issues**: Test responsiveness and adjust mobile breakpoints
- **Loading issues**: Verify file format compatibility and file size
