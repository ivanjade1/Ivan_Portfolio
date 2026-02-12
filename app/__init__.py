"""
Flask Application Factory
Creates and configures the Flask application instance
"""
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
import os

# Initialize Flask-Mail
mail = Mail()


def create_app(config_name='development'):
    """
    Application factory pattern for creating Flask app
    
    Args:
        config_name: Configuration environment (development/production)
    
    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__, 
                static_folder='static',
                template_folder='templates')
    
    # Enable CORS for API endpoints
    CORS(app)
    
    # Application configuration
    app.config.update(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production'),
        DEBUG=config_name == 'development',
        TEMPLATES_AUTO_RELOAD=True,
        JSON_SORT_KEYS=False,
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file upload,
        # Flask-Mail configuration
        MAIL_SERVER=os.environ.get('MAIL_SERVER', 'smtp.gmail.com'),
        MAIL_PORT=int(os.environ.get('MAIL_PORT', 587)),
        MAIL_USE_TLS=os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true',
        MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
        MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
        MAIL_DEFAULT_SENDER=os.environ.get('MAIL_DEFAULT_SENDER', os.environ.get('MAIL_USERNAME'))
    )
    
    # Initialize Flask-Mail with app
    mail.init_app(app)
    
    # Register blueprints
    from app.routes import main_bp, api_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Resource not found"}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Internal server error"}, 500
    
    return app
