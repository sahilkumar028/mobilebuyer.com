@echo off
REM Test Google Sheets API with curl on Windows
REM Replace with your actual Google Apps Script URL

set SCRIPT_URL=https://script.google.com/macros/s/AKfycbwrjIiXHiFJbivTU1bNZIdoe_rNdBxeDh9TzhmCWYb9i6gD3Jq3-Xa7f0wSfhS4AeFt/exec

echo === Testing Google Sheets API ===
echo URL: %SCRIPT_URL%
echo.

REM Test 1: GET request to check if script is running
echo 1. Testing GET request (health check):
curl -X GET "%SCRIPT_URL%" -H "Accept: application/json" -w "Status: %%{http_code}" -s
echo.
echo ---

REM Test 2: POST request with sell phone data (FormData format)
echo 2. Testing POST request with sell phone data:
curl -X POST "%SCRIPT_URL%" ^
  -H "Accept: application/json" ^
  -F "data={\"type\": \"sell_phone\", \"timestamp\": \"2024-02-04T10:30:00.000Z\", \"brand\": \"apple\", \"model\": \"iPhone 13\", \"purchaseYear\": \"2021\", \"hasBox\": \"Yes\", \"hasCharger\": \"Yes\", \"physicalCondition\": \"good\", \"screenCondition\": \"perfect\", \"batteryHealth\": \"excellent\", \"customerName\": \"Test Customer\", \"customerPhone\": \"9876543210\", \"customerEmail\": \"test@example.com\", \"pickupAddress\": \"Test Address, Mumbai\", \"estimatedValue\": 25000, \"status\": \"Test Lead\"}" ^
  -w "Status: %%{http_code}" -s
echo.
echo ---

REM Test 3: POST request with contact form data
echo 3. Testing POST request with contact form data:
curl -X POST "%SCRIPT_URL%" ^
  -H "Accept: application/json" ^
  -F "data={\"type\": \"contact_form\", \"timestamp\": \"2024-02-04T10:30:00.000Z\", \"name\": \"Test User\", \"phone\": \"9876543210\", \"email\": \"test@example.com\", \"brand\": \"samsung\", \"model\": \"Galaxy S23\", \"condition\": \"good\", \"service\": \"Repair\", \"message\": \"Need screen repair\", \"status\": \"Test Inquiry\"}" ^
  -w "Status: %%{http_code}" -s
echo.
echo ---

REM Test 4: POST request with invalid data to test error handling
echo 4. Testing POST request with invalid data:
curl -X POST "%SCRIPT_URL%" ^
  -H "Accept: application/json" ^
  -F "data={\"type\": \"invalid_type\", \"test\": \"data\"}" ^
  -w "Status: %%{http_code}" -s
echo.
echo === Test Complete ===
pause