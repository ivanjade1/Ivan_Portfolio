# Portfolio Website

A modern, interactive portfolio website built with Flask, Tailwind CSS, and Bootstrap Icons.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ✨ Interactive animations and smooth transitions
- 🎯 Modular component architecture
- 🚀 Fast and lightweight
- 📱 Mobile-friendly responsive layout
- 🎭 Particle background effects
- 📊 Animated skill progress bars
- 💼 Project showcase with filtering
- 📝 Contact form with validation
- ⚡ Dynamic content loading

## Tech Stack

### Backend
- Python 3.8+
- Flask 3.0
- Flask-CORS

### Frontend
- Tailwind CSS (CDN)
- Bootstrap Icons
- Vanilla JavaScript (ES6 modules)
- AOS (Animate On Scroll)

## Project Structure

```
Ivan_Portfolio/
├── app/
│   ├── __init__.py                 # Flask app factory
│   ├── routes.py                   # Application routes and API endpoints
│   ├── static/
│   │   ├── css/
│   │   │   └── custom.css         # Custom styles and animations
│   │   └── js/
│   │       ├── main.js            # Core functionality
│   │       ├── animations.js      # Animation effects
│   │       └── interactions.js    # User interactions
│   └── templates/
│       ├── base.html              # Base template
│       ├── index.html             # Main page
│       └── components/
│           ├── header.html        # Navigation component
│           ├── hero.html          # Hero section
│           ├── about.html         # About section
│           ├── skills.html        # Skills section
│           ├── projects.html      # Projects section
│           ├── experience.html    # Experience timeline
│           ├── testimonials.html  # Testimonials section
│           ├── contact.html       # Contact form
│           └── footer.html        # Footer component
├── requirements.txt               # Python dependencies
├── run.py                         # Application entry point
└── README.md                      # This file
```

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Steps

1. Clone or navigate to the project directory:
```bash
cd Ivan_Portfolio
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

### Development Server

Run the Flask development server:
```bash
python run.py
```

The application will be available at:
- Local: http://127.0.0.1:5000
- Network: http://<your-ip>:5000

### Environment Variables

You can customize the server configuration using environment variables:

```bash
# Windows PowerShell
$env:FLASK_DEBUG="True"
$env:FLASK_HOST="127.0.0.1"
$env:FLASK_PORT="5000"

# macOS/Linux
export FLASK_DEBUG=True
export FLASK_HOST=127.0.0.1
export FLASK_PORT=5000
```

## Customization

### Update Content

Replace placeholder content in the template files:

1. **Personal Information**: Update `app/routes.py` - modify the `portfolio_data` dictionary
2. **Projects**: Update `app/routes.py` - modify the `get_projects()` function
3. **Skills**: Update `app/routes.py` - modify the `get_skills()` function
4. **Images**: Replace placeholder URLs with your own images
5. **Social Links**: Update links in `header.html` and `footer.html`

### Styling

- **Tailwind Configuration**: Modify the config in `base.html`
- **Custom CSS**: Edit `app/static/css/custom.css`
- **Colors**: Change gradient colors in Tailwind config

### Animations

- **Particle Effect**: Modify `animations.js` - `initializeParticlesBackground()`
- **Scroll Animations**: Configure AOS settings in `base.html`
- **Custom Animations**: Add to `custom.css`

## API Endpoints

### Main Routes
- `GET /` - Main portfolio page
- `GET /about` - About section
- `GET /projects` - Projects section
- `GET /contact` - Contact section

### API Routes
- `POST /api/contact` - Submit contact form
- `GET /api/projects` - Get projects data
- `GET /api/skills` - Get skills data
- `GET /api/stats` - Get portfolio statistics

## Code Structure

All code files are structured to maintain **under 300 lines per file** as requested:

- Flask routes: ~200 lines
- Template components: ~100-250 lines each
- JavaScript modules: ~200-250 lines each
- CSS: ~200 lines

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading images
- Optimized animations
- Minimal JavaScript bundle
- CDN-hosted libraries

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please open an issue in the repository.

## Author

**Your Name**
- Email: your.email@example.com
- Website: yourwebsite.com
- GitHub: @yourusername

---

Made with ❤️ using Flask, Tailwind CSS, and Bootstrap Icons
