"""
Portfolio Website - Main Entry Point
Run this file to start the Flask development server
"""
import os
from dotenv import load_dotenv
from app import create_app

# Load environment variables from .env file
load_dotenv()

# Create Flask application instance
app = create_app()

if __name__ == '__main__':
    # Get configuration from environment variables
    debug_mode = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    host = os.environ.get('FLASK_HOST', '127.0.0.1')
    port = int(os.environ.get('FLASK_PORT', 5000))
    
    print(f"""
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║         Portfolio Website - Flask Server              ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    
    🚀 Server is running!
    
    📍 Local:    http://{host}:{port}
    📍 Network:  http://<your-ip>:{port}
    
    Press CTRL+C to stop the server
    """)
    
    # Run the Flask application
    app.run(
        host=host,
        port=port,
        debug=debug_mode,
        threaded=True
    )
