## Registration Notification Email

```
sendMail(
  userData.email,
  'User Registration Successful | Contact Management',
  `<div style="max-width:600px; margin:20px auto; font-family:Arial, sans-serif; padding:20px;">
    <h2 style="color:#333;">Welcome, ${userData.name}!</h2>
    <p style="color:#666; line-height:1.5;">
      Your account has been successfully created.<br>
      Start managing your contacts now:
    </p>
    <a href="${process.env.APP_URL}/login" style="display:block; width:200px; margin:20px auto; padding:12px; text-align:center; background:#007bff; color:white; text-decoration:none; border-radius:5px;">
      Access Dashboard
    </a>
    <p style="color:#999; font-size:12px; text-align:center;">
      Need help? Reply to this email<br>
      <a href="${process.env.APP_URL}/unsubscribe" style="color:#999;">Unsubscribe</a> | 
      <a href="${process.env.APP_URL}/privacy" style="color:#999;">Privacy</a>
    </p>
  </div>`
)
```

## Login Notification Email

```
sendMail(
  userEmail,
  'New Login Detected | Contact Management',
  `<div style="max-width:600px; margin:20px auto; font-family:Arial, sans-serif; padding:20px;">
    <h2 style="color:#333;">Hi ${userName}!</h2>
    <p style="color:#666; line-height:1.5;">
      We detected a login to your account from:<br>
      • Device: ${deviceType}<br>
      • Location: ${location}<br>
      • Time: ${loginTime}
    </p>
    <a href="${process.env.APP_URL}/account/security" style="display:block; width:200px; margin:20px auto; padding:12px; text-align:center; background:#007bff; color:white; text-decoration:none; border-radius:5px;">
      Review Activity
    </a>
    <p style="color:#666; font-size:14px;">
      Not you? Please <a href="${process.env.APP_URL}/reset-password" style="color:#007bff;">reset your password</a> immediately.
    </p>
    <p style="color:#999; font-size:12px; text-align:center; border-top:1px solid #eee; padding-top:15px; margin-top:25px;">
      <a href="${process.env.APP_URL}/unsubscribe" style="color:#999;">Unsubscribe</a> | 
      <a href="${process.env.APP_URL}/privacy" style="color:#999;">Privacy</a>
    </p>
  </div>`
)
```

## Password Reset Email

```
sendMail(
  userEmail,
  'Password Reset Request | Contact Management',
  `<div style="max-width:600px; margin:20px auto; font-family:Arial, sans-serif; padding:20px;">
    <h2 style="color:#333;">Password Help, ${userName}?</h2>
    <p style="color:#666; line-height:1.5;">
      We received a request to reset your password.<br>
      This link will expire in 1 hour:
    </p>
    <a href="${process.env.APP_URL}/reset-password?token=${resetToken}" style="display:block; width:200px; margin:20px auto; padding:12px; text-align:center; background:#dc3545; color:white; text-decoration:none; border-radius:5px;">
      Reset Password
    </a>
    <p style="color:#666; font-size:14px;">
      Didn't request this? You can safely ignore this email.
    </p>
    <p style="color:#999; font-size:12px; text-align:center; border-top:1px solid #eee; padding-top:15px; margin-top:25px;">
      <a href="${process.env.APP_URL}/unsubscribe" style="color:#999;">Unsubscribe</a> | 
      <a href="${process.env.APP_URL}/privacy" style="color:#999;">Privacy</a>
    </p>
  </div>`
)
```

