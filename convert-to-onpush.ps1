# PowerShell script to convert Angular components to OnPush change detection strategy

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath
)

Write-Host "Converting Angular components to OnPush change detection strategy..." -ForegroundColor Green
Write-Host "Project Path: $ProjectPath" -ForegroundColor Yellow

# Find all component TypeScript files
$componentFiles = Get-ChildItem -Path $ProjectPath -Recurse -Filter "*.component.ts" | Where-Object { 
    $_.FullName -notlike "*node_modules*" -and 
    $_.FullName -notlike "*dist*" -and
    $_.FullName -notlike "*build*"
}

Write-Host "Found $($componentFiles.Count) component files" -ForegroundColor Yellow

$convertedCount = 0
$skippedCount = 0

foreach ($file in $componentFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    try {
        $content = Get-Content -Path $file.FullName -Raw
        $originalContent = $content
        
        # Skip if already has OnPush
        if ($content -match "ChangeDetectionStrategy\.OnPush" -or $content -match "changeDetection:\s*ChangeDetectionStrategy\.OnPush") {
            Write-Host "  -> Already has OnPush, skipping" -ForegroundColor Gray
            $skippedCount++
            continue
        }
        
        # Add ChangeDetectionStrategy import if not present
        if ($content -notmatch "ChangeDetectionStrategy") {
            # Find Component import and add ChangeDetectionStrategy
            $content = $content -replace "import\s*\{\s*Component", "import { Component, ChangeDetectionStrategy"
            
            # If Component import is on multiple lines, handle differently
            if ($content -notmatch "ChangeDetectionStrategy") {
                $content = $content -replace "from\s*'@angular/core';", ", ChangeDetectionStrategy } from '@angular/core';"
                $content = $content -replace "import\s*\{\s*Component", "import { Component"
            }
        }
        
        # Add ChangeDetectorRef import if not present
        if ($content -notmatch "ChangeDetectorRef") {
            $content = $content -replace "ChangeDetectionStrategy", "ChangeDetectionStrategy, ChangeDetectorRef"
        }
        
        # Add changeDetection property to @Component decorator
        $componentPattern = "@Component\s*\(\s*\{"
        if ($content -match $componentPattern) {
            # Add changeDetection property after the opening brace
            $content = $content -replace "(@Component\s*\(\s*\{)", "`$1`n  changeDetection: ChangeDetectionStrategy.OnPush,"
        }
        
        # Add ChangeDetectorRef to constructor if there's a constructor
        if ($content -match "constructor\s*\(") {
            # Check if ChangeDetectorRef is already in constructor
            if ($content -notmatch "private\s+cdr:\s*ChangeDetectorRef" -and $content -notmatch "private\s+changeDetectorRef:\s*ChangeDetectorRef") {
                # Add ChangeDetectorRef parameter to constructor
                $content = $content -replace "(\s*constructor\s*\([^)]*?)(\s*\)\s*\{)", "`$1,`n    private cdr: ChangeDetectorRef`$2"
                
                # Clean up if there's a leading comma
                $content = $content -replace "constructor\s*\(\s*,", "constructor("
            }
        } else {
            # Add constructor if none exists
            $classPattern = "export\s+class\s+\w+.*?\{"
            $content = $content -replace "($classPattern)", "`$1`n`n  constructor(private cdr: ChangeDetectorRef) {}`n"
        }
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "  -> Converted successfully" -ForegroundColor Green
            $convertedCount++
        } else {
            Write-Host "  -> No changes needed" -ForegroundColor Gray
            $skippedCount++
        }
        
    } catch {
        Write-Host "  -> Error processing file: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nConversion Summary:" -ForegroundColor Green
Write-Host "- Converted: $convertedCount files" -ForegroundColor Green
Write-Host "- Skipped: $skippedCount files" -ForegroundColor Yellow
Write-Host "- Total processed: $($componentFiles.Count) files" -ForegroundColor Cyan

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review the converted files manually" -ForegroundColor White
Write-Host "2. Add cdr.markForCheck() calls where needed" -ForegroundColor White
Write-Host "3. Test the application thoroughly" -ForegroundColor White
Write-Host "4. Consider using OnPush-friendly patterns (Observables, Immutable objects)" -ForegroundColor White
