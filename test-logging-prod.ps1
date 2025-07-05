# Test Logging Configuration for Production Profile

# This script demonstrates how to test the logging configuration with production profile
# Note: Make sure you have proper permissions for /var/log/vedicastro/ directory

Write-Host "Creating production log directories..." -ForegroundColor Green

# Create production log directories (Windows equivalent)
$prodLogDir = "logs\prod"
if (!(Test-Path $prodLogDir)) {
    New-Item -ItemType Directory -Path $prodLogDir -Force
    Write-Host "Created directory: $prodLogDir" -ForegroundColor Yellow
}

Write-Host "`nRunning logging test with production profile..." -ForegroundColor Green

# Set the production profile and run the test
$env:SPRING_PROFILES_ACTIVE = "prod"

# For Windows testing, we'll use a local production log path instead of /var/log/vedicastro/
$env:LOGGING_BASE_PATH = ".\logs\prod"

# Run the test
mvn test -Dtest=LoggingConfigurationTest -Dspring.profiles.active=prod

Write-Host "`nChecking created log files..." -ForegroundColor Green

if (Test-Path "$prodLogDir\*.log") {
    Write-Host "Production log files created:" -ForegroundColor Yellow
    Get-ChildItem "$prodLogDir\*.log" | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Cyan
    }
    
    Write-Host "`nSample content from security log:" -ForegroundColor Yellow
    if (Test-Path "$prodLogDir\security-prod.log") {
        Get-Content "$prodLogDir\security-prod.log" -TotalCount 3
    }
} else {
    Write-Host "No log files found in $prodLogDir" -ForegroundColor Red
}

Write-Host "`nLogging configuration test completed!" -ForegroundColor Green
Write-Host "Check the logs\prod\ directory for production-style log files." -ForegroundColor Cyan
