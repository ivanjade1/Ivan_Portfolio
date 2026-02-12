"""
Application Routes
Defines all URL routes and API endpoints for the portfolio website
"""
from flask import Blueprint, render_template, request, jsonify
from datetime import datetime
import json


# Main routes blueprint
main_bp = Blueprint('main', __name__)

# API routes blueprint
api_bp = Blueprint('api', __name__)


@main_bp.route('/')
def index():
    """
    Render the main portfolio page
    
    Returns:
        Rendered HTML template
    """
    portfolio_data = {
        'name': 'Your Name',
        'title': 'Full Stack Developer',
        'bio': 'Passionate developer creating amazing web experiences',
        'current_year': datetime.now().year
    }
    return render_template('index.html', data=portfolio_data)


@main_bp.route('/about')
def about():
    """Render about page"""
    return render_template('index.html', section='about')


@main_bp.route('/projects')
def projects():
    """Render projects page"""
    return render_template('index.html', section='projects')


@main_bp.route('/contact')
def contact():
    """Render contact page"""
    return render_template('index.html', section='contact')


@api_bp.route('/contact', methods=['POST'])
def submit_contact():
    """
    Handle contact form submission
    
    Expected JSON payload:
        {
            "name": str,
            "email": str,
            "subject": str,
            "message": str
        }
    
    Returns:
        JSON response with success/error message
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'{field.capitalize()} is required'
                }), 400
        
        # Email validation (basic)
        email = data.get('email', '')
        if '@' not in email or '.' not in email:
            return jsonify({
                'success': False,
                'error': 'Invalid email address'
            }), 400
        
        # Here you would typically:
        # - Store in database
        # - Send email notification
        # - Integrate with email service (SendGrid, etc.)
        
        # For now, just log the submission
        print(f"Contact form submission from {data.get('name')} ({data.get('email')})")
        print(f"Message: {data.get('message')}")
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your request'
        }), 500


@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """
    Get all projects data
    
    Returns:
        JSON array of project objects
    """
    # Placeholder project data
    projects = [
        {
            'id': 1,
            'title': 'Project Alpha',
            'description': 'An innovative web application built with modern technologies',
            'image': 'https://via.placeholder.com/400x300',
            'tech_stack': ['React', 'Node.js', 'MongoDB', 'AWS'],
            'github': '#',
            'demo': '#',
            'featured': True
        },
        {
            'id': 2,
            'title': 'Project Beta',
            'description': 'Mobile-first e-commerce platform with real-time features',
            'image': 'https://via.placeholder.com/400x300',
            'tech_stack': ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
            'github': '#',
            'demo': '#',
            'featured': True
        },
        {
            'id': 3,
            'title': 'Project Gamma',
            'description': 'AI-powered analytics dashboard for business intelligence',
            'image': 'https://via.placeholder.com/400x300',
            'tech_stack': ['Angular', 'Flask', 'TensorFlow', 'Redis'],
            'github': '#',
            'demo': '#',
            'featured': False
        }
    ]
    
    return jsonify(projects), 200


@api_bp.route('/skills', methods=['GET'])
def get_skills():
    """
    Get skills data with proficiency levels
    
    Returns:
        JSON object categorizing skills
    """
    skills = {
        'frontend': [
            {'name': 'HTML/CSS', 'level': 90},
            {'name': 'JavaScript', 'level': 85},
            {'name': 'React', 'level': 80},
            {'name': 'Vue.js', 'level': 75},
            {'name': 'Tailwind CSS', 'level': 85}
        ],
        'backend': [
            {'name': 'Python', 'level': 90},
            {'name': 'Flask', 'level': 85},
            {'name': 'Node.js', 'level': 80},
            {'name': 'Django', 'level': 75},
            {'name': 'REST APIs', 'level': 85}
        ],
        'tools': [
            {'name': 'Git', 'level': 85},
            {'name': 'Docker', 'level': 75},
            {'name': 'AWS', 'level': 70},
            {'name': 'PostgreSQL', 'level': 80},
            {'name': 'MongoDB', 'level': 75}
        ]
    }
    
    return jsonify(skills), 200


@api_bp.route('/stats', methods=['GET'])
def get_stats():
    """
    Get portfolio statistics for animated counters
    
    Returns:
        JSON object with various stats
    """
    stats = {
        'projects_completed': 42,
        'years_experience': 5,
        'happy_clients': 28,
        'code_commits': 1337
    }
    
    return jsonify(stats), 200
