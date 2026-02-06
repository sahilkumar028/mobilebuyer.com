# Contact Form Debug Guide

## Issue Fixed: Field Name Mismatch

### Problem
The contact form was sending data with field names like:
- `customerName`
- `customerPhone` 
- `customerEmail`
- `phoneBrand`
- `phoneModel`
- `phoneCondition`
- `serviceRequired`

But the Google Apps Script was expecting:
- `name`
- `phone`
- `email`
- `brand`
- `model`
- `condition`
- `service`

### Solution Applied
Updated the `handleContactForm` function in Google Apps Script to handle both field name formats:

```javascript
const rowData = [
  data.timestamp || new Date().toISOString(),
  data.customerName || data.name || 'N/A',           // Handle both formats
  data.customerPhone || data.phone || 'N/A',         // Handle both formats
  data.customerEmail || data.email || 'N/A',         // Handle both formats
  data.phoneBrand || data.brand || 'N/A',            // Handle both formats
  data.phoneModel || data.model || 'N/A',            // Handle both formats
  data.phoneCondition || data.condition || 'N/A',    // Handle both formats
  data.serviceRequired || data.service || 'N/A',     // Handle both formats
  data.message || 'N/A',
  data.status || 'New Inquiry'
];
```

## Data Structure Being Sent

The contact form sends this JSON structure:

```json
{
  "type": "contact_form",
  "timestamp": "2024-02-06T...",
  "customerName": "John Doe",
  "customerPhone": "+91-9876543210", 
  "customerEmail": "john@example.com",
  "phoneBrand": "apple",
  "phoneModel": "iPhone 13",
  "phoneCondition": "good",
  "serviceRequired": "sell",
  "message": "I want to sell my phone",
  "status": "New Contact"
}
```

## Testing Steps

### 1. Test Google Apps Script
Run the `testContactFormSubmission()` function in Google Apps Script to verify it can handle contact form data.

### 2. Check Environment Variable
Ensure `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is set in your environment:
- For development: `.env.local` file
- For production: Vercel environment variables

### 3. Verify Google Sheets
After form submission, check for:
- "Contact Inquiries" sheet is created
- Headers are properly formatted (green background)
- Data appears in correct columns

### 4. Debug Form Submission
Add console logging to see what's being sent:

```javascript
console.log('Sending payload:', JSON.stringify(payload));
console.log('Script URL:', scriptURL);
console.log('Response:', result);
```

## Common Issues & Solutions

### Issue 1: Environment Variable Not Set
**Symptom**: "Google Script URL not configured" error
**Solution**: Add `NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_url` to `.env.local`

### Issue 2: CORS Issues
**Symptom**: Network errors or blocked requests
**Solution**: Ensure Google Apps Script is deployed as web app with "Anyone" access

### Issue 3: Data Not Appearing in Sheets
**Symptom**: Form submits but no data in Google Sheets
**Solution**: Check Google Apps Script logs for errors

### Issue 4: Wrong Sheet Name
**Symptom**: Data goes to wrong sheet
**Solution**: Verify `type: 'contact_form'` is being sent correctly

## Verification Checklist

- [ ] Google Apps Script updated with field name fixes
- [ ] Environment variable `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is set
- [ ] Google Apps Script deployed as web app
- [ ] Web app permissions set to "Anyone"
- [ ] Test contact form submission works
- [ ] Data appears in "Contact Inquiries" sheet
- [ ] Email notifications are sent (if configured)

## Next Steps

1. **Deploy Updated Script**: Save and deploy the updated Google Apps Script
2. **Test Form**: Submit a test contact form
3. **Verify Data**: Check Google Sheets for the new "Contact Inquiries" sheet
4. **Monitor Logs**: Check Google Apps Script execution logs for any errors

The contact form should now work correctly with the Google Sheets integration!