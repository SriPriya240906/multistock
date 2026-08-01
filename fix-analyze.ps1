# PowerShell script to restore analyze.tsx

Write-Host "Restoring analyze.tsx from backup..." -ForegroundColor Green

# Check if .output build exists
if (Test-Path ".output/server/_ssr/analyze-kMaa319A.mjs") {
    Write-Host "Build output found. The file structure is documented in:" -ForegroundColor Yellow
    Write-Host "  - ANALYZE_PAGE_ENHANCEMENTS.md"
    Write-Host "  - ANALYZE_REORGANIZATION_GUIDE.md"
    Write-Host "  - FLOATING_CHAT_IMPLEMENTATION.tsx"
    Write-Host ""
    Write-Host "The file needs to be manually reconstructed." -ForegroundColor Red
    Write-Host "Please use your IDE's Local History or Version Control to restore it." -ForegroundColor Red
    Write-Host ""
    Write-Host "Or press Ctrl+Z in your editor to undo recent changes." -ForegroundColor Yellow
} else {
    Write-Host "No build output found." -ForegroundColor Red
}

Write-Host ""
Write-Host "RECOMMENDED SOLUTION:" -ForegroundColor Cyan
Write-Host "1. Open VS Code" -ForegroundColor White
Write-Host "2. Right-click on src/routes folder" -ForegroundColor White
Write-Host "3. Select 'Local History' > 'Find in Local History'" -ForegroundColor White  
Write-Host "4. Restore analyze.tsx from before the corruption" -ForegroundColor White
Write-Host ""
Write-Host "OR use Git if you have commits:" -ForegroundColor Cyan
Write-Host "   git log --all -- src/routes/analyze.tsx" -ForegroundColor White
Write-Host "   git checkout <commit-hash> -- src/routes/analyze.tsx" -ForegroundColor White
