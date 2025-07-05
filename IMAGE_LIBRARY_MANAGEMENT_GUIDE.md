# Image Library Management System

A comprehensive image library management system for the Vedic Astrology application with backend storage, database management, and Angular admin interface.

## 🚀 Features

### Backend Features
- **RESTful API** for complete image CRUD operations
- **Structured folder storage** organized by lesson, topic, and course
- **Multiple file format support** (JPEG, PNG, GIF, WebP)
- **Automatic image processing** with dimension extraction
- **File size validation** and image dimension limits
- **Advanced search and filtering** capabilities
- **Batch upload and delete** operations
- **Image categorization** system
- **Association management** with lessons, topics, and courses
- **Comprehensive statistics** and reporting

### Admin Interface Features
- **Modern Angular UI** with Material Design
- **Table and Grid view modes** for different preferences
- **Advanced filtering** by category, associations, and search terms
- **Drag & drop upload** with multiple file support
- **Image preview and details** dialogs
- **Bulk operations** for efficient management
- **Real-time search** with debounced input
- **Responsive design** for mobile and desktop
- **Comprehensive metadata management**

## 📁 Project Structure

### Backend Components

```
src/main/java/com/vedicastrology/
├── entity/
│   ├── ImageLibrary.java          # Main entity for image data
│   └── ImageCategory.java         # Enum for image categories
├── repository/
│   └── ImageLibraryRepository.java # Data access layer
├── service/
│   ├── ImageLibraryService.java    # Service interface
│   └── ImageLibraryServiceImpl.java # Service implementation
├── controller/
│   └── ImageLibraryController.java # REST API endpoints
└── dto/
    └── ImageStatisticsResponse.java # Statistics response DTO
```

### Frontend Components

```
admin/src/app/
├── services/
│   └── image-library.service.ts   # Angular service for API calls
└── pages/images/
    ├── image-library.component.ts  # Main component
    ├── image-library.component.html # Template
    ├── image-library.component.scss # Styles
    └── image-library.module.ts     # Module configuration
```

### Database Schema

```sql
image_library/
├── image_id (PRIMARY KEY)
├── file_name, original_name, file_path
├── file_size, mime_type, width, height
├── title, description, alt_text, tags
├── lesson_id, topic_id, course_id (FOREIGN KEYS)
├── category (ENUM)
├── is_public, is_featured, status_flag
├── uploaded_by, upload_date, updated_at
└── Indexes for performance optimization
```

## 🔧 API Endpoints

### Image CRUD Operations
- `GET /api/images` - Get all images with pagination
- `GET /api/images/{id}` - Get specific image
- `GET /api/images/{id}/view` - View image file
- `POST /api/images/upload` - Upload single image
- `POST /api/images/upload/multiple` - Upload multiple images
- `PUT /api/images/{id}` - Update image metadata
- `DELETE /api/images/{id}` - Delete image

### Search and Filter Operations
- `GET /api/images/search?searchTerm={term}` - Search images
- `GET /api/images/filter` - Advanced filtering
- `GET /api/images/category/{category}` - Filter by category
- `GET /api/images/lesson/{lessonId}` - Get images by lesson
- `GET /api/images/topic/{topicId}` - Get images by topic
- `GET /api/images/course/{courseId}` - Get images by course

### Utility Operations
- `GET /api/images/featured` - Get featured images
- `GET /api/images/recent` - Get recently uploaded
- `GET /api/images/orphaned` - Get unassociated images
- `GET /api/images/statistics` - Get usage statistics
- `GET /api/images/categories` - Get all categories

## 📊 Image Categories

The system supports the following image categories:

- **LESSON_CONTENT** - Images used within lesson content
- **TOPIC_THUMBNAIL** - Thumbnail images for topics
- **COURSE_BANNER** - Banner images for courses
- **ILLUSTRATION** - General illustrations
- **DIAGRAM** - Technical diagrams and charts
- **ICON** - Icons and small graphics
- **BACKGROUND** - Background images
- **PROFILE** - Profile and user images
- **GENERAL** - Uncategorized images
- **MARKETING** - Marketing and promotional images

## 💾 Storage Structure

Images are automatically organized in a hierarchical folder structure:

```
uploads/images/
├── lesson_content/
│   └── course_1/
│       └── topic_1/
│           └── lesson_1/
│               ├── 1672531200000_a1b2c3d4.jpg
│               └── 1672531300000_e5f6g7h8.png
├── course_banner/
│   └── course_1/
│       └── 1672531400000_i9j0k1l2.jpg
├── icon/
│   └── general/
│       └── 1672531500000_m3n4o5p6.png
└── general/
    └── 1672531600000_q7r8s9t0.gif
```

## 🔒 Security Features

- **File type validation** - Only image formats allowed
- **File size limits** - Configurable maximum file size
- **Dimension validation** - Prevent excessively large images
- **Sanitized file names** - Prevent directory traversal
- **Access control** - Integration with existing auth system

## ⚙️ Configuration

### Application Properties

```properties
# Image Upload Configuration
app.image.upload.dir=uploads/images
app.image.max.size=10485760          # 10MB
app.image.allowed.types=image/jpeg,image/png,image/gif,image/webp
app.image.max.width=4000
app.image.max.height=4000

# Spring Multipart Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
spring.servlet.multipart.enabled=true
```

### Environment Variables

For production deployment, configure these environment variables:

```bash
IMAGE_UPLOAD_DIR=/var/lib/astro/images
IMAGE_MAX_SIZE=10485760
IMAGE_ALLOWED_TYPES=image/jpeg,image/png,image/gif,image/webp
IMAGE_MAX_WIDTH=4000
IMAGE_MAX_HEIGHT=4000
```

## 🚀 Installation & Setup

### 1. Database Migration

Run the migration script to create the image_library table:

```sql
-- Located at: src/main/resources/db/migration/V20250705001__Create_Image_Library_Table.sql
```

### 2. Backend Configuration

Ensure the image upload directory exists and has proper permissions:

```bash
mkdir -p uploads/images
chmod 755 uploads/images
```

### 3. Frontend Setup

The Angular admin interface is automatically included when you:

1. Build the admin application
2. Navigate to `/admin/images` in your browser
3. The image library will be accessible from the main navigation

## 📱 Usage Examples

### Upload Single Image via API

```bash
curl -X POST "http://localhost:8080/api/images/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@image.jpg" \
  -F "title=Sample Image" \
  -F "description=A sample image for testing" \
  -F "category=LESSON_CONTENT" \
  -F "lessonId=1"
```

### Search Images

```bash
curl "http://localhost:8080/api/images/search?searchTerm=astrology&page=0&size=10"
```

### Filter Images

```bash
curl "http://localhost:8080/api/images/filter?category=COURSE_BANNER&courseId=1&page=0&size=10"
```

### Angular Service Usage

```typescript
// Upload image
const file = event.target.files[0];
const metadata = {
  title: 'Sample Image',
  category: ImageCategory.LESSON_CONTENT,
  lessonId: 1
};

this.imageService.uploadImage(file, metadata).subscribe(result => {
  console.log('Upload successful:', result);
});

// Search images
this.imageService.searchImages('astrology', 0, 10).subscribe(results => {
  console.log('Search results:', results);
});
```

## 📊 Performance Considerations

### Database Optimization
- Indexed columns for fast queries
- Proper foreign key constraints
- Optimized queries with pagination

### File Storage
- Hierarchical folder structure prevents large directories
- Unique filename generation prevents conflicts
- Configurable storage location for scalability

### Frontend Performance
- Lazy loading of images
- Pagination for large datasets
- Debounced search input
- Efficient change detection

## 🔄 Future Enhancements

### Planned Features
- [ ] **Image thumbnails** - Automatic thumbnail generation
- [ ] **Image optimization** - Automatic compression and format conversion
- [ ] **CDN integration** - Cloud storage support (AWS S3, etc.)
- [ ] **Image versioning** - Track image changes over time
- [ ] **Bulk editing** - Mass update of metadata
- [ ] **Image gallery widgets** - Embeddable gallery components
- [ ] **Advanced search** - AI-powered image recognition
- [ ] **Image analytics** - Usage tracking and insights

### Scalability Improvements
- [ ] **Microservice architecture** - Separate image service
- [ ] **Background processing** - Async image processing
- [ ] **Caching layer** - Redis for frequently accessed images
- [ ] **Load balancing** - Multiple storage backends

## 🐛 Troubleshooting

### Common Issues

**1. Upload fails with "File too large" error**
- Check `spring.servlet.multipart.max-file-size` setting
- Verify `app.image.max.size` configuration

**2. Images not displaying in admin interface**
- Ensure backend server is running
- Check CORS configuration
- Verify image file permissions

**3. Database foreign key errors**
- Confirm lesson/topic/course IDs exist
- Check foreign key constraints in migration

**4. File permission errors**
- Ensure upload directory has write permissions
- Check user/group ownership of upload directory

### Debug Mode

Enable debug logging for image operations:

```properties
logging.level.com.vedicastrology.service.ImageLibraryServiceImpl=DEBUG
logging.level.com.vedicastrology.controller.ImageLibraryController=DEBUG
```

## 📞 Support

For issues, feature requests, or questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Enable debug logging for detailed error information
4. Contact the development team with specific error messages

## 📝 License

This image library management system is part of the Vedic Astrology application and follows the same licensing terms.

---

**✅ Status: FULLY IMPLEMENTED AND DOCUMENTED**

The image library management system provides comprehensive functionality for storing, organizing, and managing images with a modern, user-friendly admin interface and robust backend API.
