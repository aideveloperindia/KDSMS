$body = @{
    setupKey = "kdsms-setup-2024"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "Setting up users in production database..."
Write-Host "This may take a few minutes..."

try {
    $response = Invoke-RestMethod -Uri "https://storiesofinfluencers.com/api/auth/setup-users" -Method POST -Body $body -Headers $headers
    
    if ($response.success) {
        Write-Host "✅ SUCCESS!" -ForegroundColor Green
        Write-Host "Created $($response.count) users successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now login with these credentials:" -ForegroundColor Yellow
        Write-Host "AGT-Z5A1-008 / password123" -ForegroundColor Cyan
        Write-Host "EXE-Z4A3-001 / password123" -ForegroundColor Cyan
        Write-Host "ZM-Z5-001 / password123" -ForegroundColor Cyan
        Write-Host "AGM-001 / password123" -ForegroundColor Cyan
        Write-Host "MGMT-001 / password123" -ForegroundColor Cyan
    } else {
        Write-Host "❌ ERROR: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Network Error: $($_.Exception.Message)" -ForegroundColor Red
} 