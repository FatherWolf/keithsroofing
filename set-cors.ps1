# PowerShell script to set CORS configuration
$corsConfig = @'
[
  {
    "origin": ["http://localhost:3000", "https://keithroofing-41fdb.web.app", "https://keithroofing-41fdb.firebaseapp.com"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization", "Content-Length", "User-Agent", "X-Requested-With"]
  }
]
'@

# Get access token
$token = & gcloud auth print-access-token

# Set CORS configuration
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$uri = "https://storage.googleapis.com/storage/v1/b/keithroofing-41fdb.appspot.com?fields=cors"

try {
    Invoke-RestMethod -Uri $uri -Method PATCH -Headers $headers -Body $corsConfig
    Write-Host "CORS configuration updated successfully!"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}