# Email Configuration Guide

## Gmail Setup for Contact Form

Your portfolio contact form is now configured to send emails! Follow these steps to complete the setup:

### 1. Update Your Email in `.env` file

Open `.env` and update these fields:
```
MAIL_USERNAME=your-actual-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-actual-email@gmail.com
```

### 2. Gmail App Password Setup

**Important:** Gmail requires an "App Password" for third-party applications.

#### Steps to generate Gmail App Password:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" and follow the setup

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Windows Computer" or "Other" as the device
   - Click "Generate"
   - Copy the 16-character password (without spaces)

3. **Update `.env` file**:
   ```
   MAIL_PASSWORD=abcdabcdabcdabcd
   ```
   Replace with your actual 16-character app password (no spaces)

### 3. Current Configuration

Based on your `.env.example`, I've set up:
- **Password**: `litbonajnuuirddh` (removed spaces)
- **Email**: `your-email@gmail.com` (UPDATE THIS!)

**⚠️ IMPORTANT**: Replace `your-email@gmail.com` with your actual Gmail address!

### 4. Test the Contact Form

1. Start the server:
   ```powershell
   python run.py
   ```

2. Open your browser: http://127.0.0.1:5000

3. Scroll to the contact form and submit a test message

4. Check your Gmail inbox for the notification email

### 5. Troubleshooting

#### "Authentication failed" error:
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled
- Check that the email address matches exactly

#### "Connection refused" error:
- Check your internet connection
- Gmail SMTP might be blocked by firewall/antivirus
- Try port 465 with SSL instead:
  ```
  MAIL_PORT=465
  MAIL_USE_TLS=False
  MAIL_USE_SSL=True
  ```

#### Email not received:
- Check your spam folder
- Verify MAIL_USERNAME is set correctly
- Check server console for error messages

### 6. Security Notes

- ✅ `.env` file is already in `.gitignore` (won't be committed to Git)
- ✅ Never share your App Password publicly
- ✅ Never commit `.env` file to version control
- ✅ Use `.env.example` as a template for others

### 7. Alternative Email Services

If Gmail doesn't work, you can use:

**Outlook/Hotmail:**
```
MAIL_SERVER=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USE_TLS=True
```

**Yahoo:**
```
MAIL_SERVER=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USE_TLS=True
```

**SendGrid (Recommended for production):**
```
MAIL_SERVER=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
```

## How It Works

When someone submits your contact form:
1. Form data is validated
2. A beautifully formatted email is created
3. Email is sent to your Gmail address (MAIL_USERNAME)
4. You can reply directly to the sender (reply-to header is set)
5. User sees success message on your website

## Email Template

The email includes:
- ✉️ Sender's name and email
- 📝 Subject line
- 💬 Message content
- 🎨 Beautiful HTML formatting
- 🔄 Reply-to header for easy responses

---

Need help? Check the console output when submitting the form for detailed error messages!
