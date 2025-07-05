# Framework-Based Log Archiving

## Overview

This application now uses the Logback logging framework's native archiving capabilities instead of a custom service. This provides better performance, reliability, and integration with the logging system.

## Configuration

### Key Features

- **Size-based archiving**: Log files are automatically archived when they reach 100KB (configurable)
- **Automatic compression**: Archived files are compressed using GZIP
- **Separate archive folder**: Archived files are moved to `archive/` subdirectories
- **Environment-specific settings**: Different configurations for dev and prod environments
- **Configurable via properties**: Easy to modify thresholds without code changes

### Property Configuration

The archiving behavior is controlled via Spring properties:

#### Dev Environment (`application-dev.properties`)
```properties
# Framework-based Log Archiving Configuration
logging.framework.max-file-size=100KB
logging.framework.max-history=30
logging.framework.total-size-cap=10MB
logging.framework.archive-folder=./logs/dev/archive
logging.framework.compression-enabled=true
```

#### Production Environment (`application-prod.properties`)
```properties
# Framework-based Log Archiving Configuration
logging.framework.max-file-size=100KB
logging.framework.max-history=90
logging.framework.total-size-cap=500MB
logging.framework.archive-folder=/var/log/vedicastro/archive
logging.framework.compression-enabled=true
```

### Environment Variables

You can override these settings using environment variables:

- `LOG_MAX_FILE_SIZE`: Maximum size before archiving (default: 100KB)
- `LOG_MAX_HISTORY`: Number of archived files to keep (default: 30 for dev, 90 for prod)
- `LOG_TOTAL_SIZE_CAP`: Total size cap for all archived files (default: varies by env)
- `LOG_ARCHIVE_FOLDER`: Archive directory location
- `LOG_COMPRESSION_ENABLED`: Enable/disable compression (default: true)

## File Structure

### Development Environment
```
logs/
├── dev/
│   ├── vedicastro-dev.log           # Current log file
│   ├── security-dev.log             # Security events
│   ├── performance-dev.log          # Performance metrics
│   ├── dos-protection-dev.log       # DoS protection events
│   ├── login-history-dev.log        # Login/logout events
│   └── archive/                     # Archived files
│       ├── vedicastro-dev-2025-07-05.0.log.gz
│       ├── security-dev-2025-07-05.0.log.gz
│       └── ...
```

### Production Environment
```
/var/log/vedicastro/
├── vedicastro-prod.log              # Current log file
├── security-prod.log                # Security events
├── performance-prod.log             # Performance metrics
├── dos-protection-prod.log          # DoS protection events
├── login-history-prod.log           # Login/logout events
└── archive/                         # Archived files
    ├── vedicastro-prod-2025-07-05.0.log.gz
    ├── security-prod-2025-07-05.0.log.gz
    └── ...
```

## Archiving Behavior

### When Archiving Occurs

1. **Size Threshold**: When a log file reaches the configured size (default: 100KB)
2. **Daily Rotation**: Files are also rotated daily regardless of size
3. **Application Startup**: Can be configured to clean old files on startup (dev only)

### Archived File Naming

Archived files follow this pattern:
```
{logname}-{date}.{index}.log.gz
```

Examples:
- `vedicastro-dev-2025-07-05.0.log.gz`
- `security-prod-2025-07-05.1.log.gz`

### Cleanup Policy

- **Max History**: Keeps only the specified number of archived files
- **Total Size Cap**: Removes oldest files when total archive size exceeds limit
- **Automatic Cleanup**: Logback automatically manages file deletion

## Advantages Over Custom Service

1. **Performance**: Native framework handling is more efficient
2. **Reliability**: Battle-tested archiving logic
3. **Thread Safety**: No custom threading or file locking issues
4. **Memory Efficient**: Streaming compression and file operations
5. **Monitoring**: Better integration with logging system monitoring
6. **Configuration**: Standard Spring configuration patterns

## Monitoring and Troubleshooting

### Log File Locations

Check these locations for current log files:

**Development**:
- Current logs: `./logs/dev/`
- Archived logs: `./logs/dev/archive/`

**Production**:
- Current logs: `/var/log/vedicastro/`
- Archived logs: `/var/log/vedicastro/archive/`

### Common Issues

1. **Archive folder not created**: Logback will create it automatically
2. **Permission issues**: Ensure write access to log directories
3. **Disk space**: Monitor total size caps and adjust if needed

### Verifying Archiving

To test archiving in development:

1. Start the application: `mvn spring-boot:run -Dspring-boot.run.profiles=dev`
2. Generate log entries to exceed 100KB
3. Check `./logs/dev/archive/` for compressed files

## Legacy Custom Service

The custom `LogArchivingService` has been disabled but kept for reference. To re-enable it:

1. Set `app.logging.archiving.enabled=true` in properties
2. Set `logging.framework.*` properties to higher thresholds
3. The custom service will handle additional archiving logic

## Configuration Examples

### High-Volume Environment
```properties
logging.framework.max-file-size=50KB
logging.framework.max-history=100
logging.framework.total-size-cap=1GB
```

### Low-Volume Environment
```properties
logging.framework.max-file-size=500KB
logging.framework.max-history=10
logging.framework.total-size-cap=50MB
```

### Development/Testing
```properties
logging.framework.max-file-size=10KB
logging.framework.max-history=5
logging.framework.total-size-cap=1MB
```

This framework-based approach provides robust, performant, and maintainable log archiving for the VedicAstro application.
