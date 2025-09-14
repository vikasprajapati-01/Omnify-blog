# Blog Application

A full-stack blog application built with Django REST Framework and React with TypeScript. Users can create accounts, write blogs, and view blogs published by others.

## Features

- **User Authentication**: Email-based registration and login with JWT tokens
- **Blog Management**: Create, edit, delete, and view blogs
- **Public Blog Listing**: Anyone can view published blogs with pagination and search
- **Responsive Design**: Works on desktop and mobile devices
- **Author Permissions**: Only blog authors can edit/delete their own blogs

## Tech Stack

### Backend
- **Django 5.2.6**: Web framework
- **Django REST Framework**: API development
- **SQLite**: Database (default, easily changeable)
- **JWT Authentication**: Secure token-based authentication
- **CORS Headers**: Cross-origin resource sharing

### Frontend
- **React 19**: UI library
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## Project Structure

```
Blog/
├── backend/
│   ├── accounts/          # User authentication app
│   ├── blog/             # Blog management app
│   ├── main/             # Django project settings
│   ├── env/              # Virtual environment
│   ├── db.sqlite3        # Database
│   └── manage.py         # Django management script
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── contexts/     # React contexts (Auth)
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv env
   # On Windows:
   env\\Scripts\\activate
   # On Mac/Linux:
   source env/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional)**:
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**:
   ```bash
   python manage.py runserver
   ```
   Backend will be available at: http://127.0.0.1:8000/

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Frontend will be available at: http://localhost:5173/

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - Get user profile (authenticated)

### Blogs
- `GET /api/blogs/` - List all published blogs (public)
- `GET /api/blogs/<id>/` - Get specific blog (public)
- `POST /api/blogs/create/` - Create new blog (authenticated)
- `PATCH /api/blogs/<id>/update/` - Update blog (author only)
- `DELETE /api/blogs/<id>/delete/` - Delete blog (author only)
- `GET /api/blogs/my-blogs/` - Get user's blogs (authenticated)

## Usage

### For Users
1. **Register**: Create a new account with email and password
2. **Login**: Sign in to access blog creation features
3. **Browse Blogs**: View all published blogs on the homepage
4. **Search**: Use the search feature to find specific blogs
5. **Create Blog**: Write and publish your own blogs
6. **Manage**: Edit or delete your own blogs

### For Developers
1. **Admin Panel**: Access Django admin at http://127.0.0.1:8000/admin/
2. **API Testing**: Use tools like Postman or curl to test API endpoints
3. **Database**: View/modify data using Django admin or database tools

## Environment Variables

Create a `.env` file in the backend directory for production:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,localhost
DATABASE_URL=your-database-url
```

## Production Deployment

### Backend (Django)
1. **Set up production database** (PostgreSQL recommended)
2. **Configure environment variables**
3. **Collect static files**: `python manage.py collectstatic`
4. **Use WSGI server** (Gunicorn, uWSGI)
5. **Set up reverse proxy** (Nginx, Apache)

### Frontend (React)
1. **Build production bundle**: `npm run build`
2. **Deploy static files** to CDN or web server
3. **Configure environment variables** for API endpoints

### Cloud Deployment Options
- **AWS**: EC2, RDS, S3, CloudFront
- **Google Cloud**: Compute Engine, Cloud SQL, Cloud Storage
- **Azure**: App Service, Azure Database, Blob Storage
- **Heroku**: Simple deployment with add-ons
- **Vercel/Netlify**: Frontend deployment
- **Railway/DigitalOcean**: Full-stack deployment

## Features Implemented

✅ **Authentication**
- Email-based user registration and login
- JWT token authentication
- Protected routes for authenticated users

✅ **Blog Management**
- Create, read, update, delete blogs
- Rich text content support
- Author-only edit/delete permissions

✅ **Public Features**
- View all published blogs without authentication
- Pagination for blog lists
- Search functionality
- Responsive design

✅ **User Interface**
- Clean, modern design with Tailwind CSS
- Mobile-responsive layout
- Form validation and error handling
- Loading states and user feedback

## Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit changes: `git commit -m "Add feature"`
5. Push to branch: `git push origin feature-name`
6. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs

## Future Enhancements

- [ ] Comments system
- [ ] Blog categories and tags
- [ ] User profiles with bio
- [ ] Image upload for blogs
- [ ] Rich text editor
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Blog analytics
- [ ] Advanced search filters
- [ ] User following system
