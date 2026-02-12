# Email Configuration Guide

## Resend Setup for Contact Form

Your portfolio contact form now uses **Resend** - a modern, developer-friendly email API with better deliverability and no complex SMTP configuration!

### 1. Create a Resend Account

1. Go to **https://resend.com**
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### 2. Add and Verify Your Domain (Optional but Recommended)

For production use with your own domain:
1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., `ivanjadeportfolio.com`)
4. Add the provided DNS records to your domain
5. Wait for verification (usually a few minutes)

**For testing:** You can use `onboarding@resend.dev` which doesn't require verification!

### 3. Get Your API Key

1. Go to: **https://resend.com/api-keys**
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select "Sending access"
5. Copy the API key (`re_...`)

### 4. Update Your `.env` File

Open `.env` and update these fields:
```
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=prejolesivanjade@gmail.com
```

**Important:**
- `RESEND_API_KEY`: Your API key from step 3
- `RESEND_FROM_EMAIL`: Use `onboarding@resend.dev` for testing, or `hello@yourdomain.com` if you verified a domain
- `RESEND_TO_EMAIL`: Your email where contact form submissions will be sent

### 4. Test the Contact Form
5. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 6. Test the Contact Form

1. Start the server:
   ```powershell
   python run.py
   ```

2. O7. Troubleshooting

#### Invalid API Key:
- Make sure you copied the entire API key (starts with `re_`)
- No quotes needed in `.env` file
- API key should be on the same line as `RESEND_API_KEY=`

#### Email not received:
- Check your spam folder
- Verify `RESEND_TO_EMAIL` is correct
- Check Resend dashboard for delivery logs: https://resend.com/emails
- Make sure you're within the free tier limit (100 emails/day)

#### Domain verification issues:
- DNS records can take up to 48 hours to propagate
- Use `onboarding@resend.dev` for immediate testing
- Check DNS propagation: https://dnschecker.org

### 8. Security Notes

- ✅ `.env` file is in `.gitignore` (won't be committed to Git)
- ✅ Never share your API key publicly
- ✅ Never commit `.env` file to version control
- ✅ Use `.env.example` as a template
- ✅ Regenerate API keys if accidentally exposed

### 9. Why Resend?

**Advantages over Gmail SMTP:**
- ✅ No app passwords or 2FA required
- ✅ Better email deliverability
- ✅ Built-in analytics and logs
- ✅ Easy to scale (up to 3,000 emails/day on free tier)
- ✅ Modern REST API
- ✅ Production-ready out of the box
- ✅ Custom domain support

### 10. Production TipsR=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USE_TLS=True
### 10. Production Tips

1. **Verify your domain** for better deliverability and professional sender address
2. **Monitor your emails** in the Resend dashboard
3. **Set up webhooks** to track delivery/bounce events (optional)
4. **Use environment variables** for all configuration (never hardcode API keys)
5. **Consider upgrading** if you need more than 100 emails/day

## How It Works

When someone submits your contact form:
1. Form data is validated (frontend + backend)
2. A beautifully formatted HTML email is created
3. Email is sent via Resend API to your inbox (`RESEND_TO_EMAIL`)
4. Reply-to header is set to the sender's email for easy responses
5. User sees success message on your website
6. Check delivery status in Resend dashboard

## Email Template Features

The email includes:
- ✉️ Sender's name and email (with clickable mailto link)
- 📝 Subject line
- 💬 Message content with proper formatting
- 🎨 Beautiful HTML design with your brand colors
- 🔄 Reply-to header for easy responses
- 📱 Mobile-responsive layout

## Resend Dashboard

View your email activity at: **https://resend.com/emails**
- See delivery status
- View email content
- Track opens/clicks (if enabled)
- Debug failures
- Monitor API usage

---

**Need help?** Check out Resend docs: https://resend.com/docs

Need help? Check the console output when submitting the form for detailed error messages!
