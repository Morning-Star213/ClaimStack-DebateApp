import { APP_URL } from './service'

/**
 * Generate welcome email template
 */
export function generateWelcomeEmail(options: {
  firstName?: string
  username: string
  email: string
}): { subject: string; html: string; text: string } {
  const displayName = options.firstName || options.username
  const subject = 'Welcome to ClaimStack!'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ClaimStack</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #030303;">ClaimStack</h1>
              <p style="margin: 8px 0 0; font-size: 16px; color: #666;">Debate Platform</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #030303;">Welcome, ${displayName}!</h2>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333;">
                Thank you for joining ClaimStack! We're excited to have you as part of our community of critical thinkers and debaters.
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333;">
                Your account has been successfully created with the following details:
              </p>
              
              <div style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Username:</strong> ${options.username}</p>
                <p style="margin: 0; font-size: 14px; color: #666;"><strong>Email:</strong> ${options.email}</p>
              </div>
              
              <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #333;">
                You can now start exploring claims, sharing perspectives, and engaging in meaningful debates.
              </p>
              
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${APP_URL}/browse" style="display: inline-block; padding: 14px 32px; background-color: #030303; color: #ffffff; text-decoration: none; border-radius: 24px; font-size: 16px; font-weight: 500;">Get Started</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #666;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
              
              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #666;">
                Happy debating!<br>
                <strong>The ClaimStack Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; font-size: 12px; color: #999; text-align: center;">
                This email was sent to ${options.email}. If you didn't create an account, please ignore this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
                © ${new Date().getFullYear()} ClaimStack. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `
Welcome to ClaimStack!

Welcome, ${displayName}!

Thank you for joining ClaimStack! We're excited to have you as part of our community of critical thinkers and debaters.

Your account has been successfully created with the following details:
- Username: ${options.username}
- Email: ${options.email}

You can now start exploring claims, sharing perspectives, and engaging in meaningful debates.

Get started: ${APP_URL}/browse

If you have any questions or need assistance, feel free to reach out to our support team.

Happy debating!
The ClaimStack Team

---
This email was sent to ${options.email}. If you didn't create an account, please ignore this email.
© ${new Date().getFullYear()} ClaimStack. All rights reserved.
  `.trim()

  return { subject, html, text }
}

/**
 * Generate password reset email template
 */
export function generatePasswordResetEmail(options: {
  firstName?: string
  username: string
  email: string
  resetToken: string
  expiresInHours?: number
}): { subject: string; html: string; text: string } {
  const displayName = options.firstName || options.username
  const subject = 'Reset Your ClaimStack Password'
  const resetUrl = `${APP_URL}/reset-password?token=${options.resetToken}&email=${encodeURIComponent(options.email)}`
  const expiresIn = options.expiresInHours || 24

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #030303;">ClaimStack</h1>
              <p style="margin: 8px 0 0; font-size: 16px; color: #666;">Debate Platform</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #030303;">Reset Your Password</h2>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333;">
                Hello ${displayName},
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333;">
                We received a request to reset your password for your ClaimStack account (${options.email}). If you didn't make this request, you can safely ignore this email.
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333;">
                To reset your password, click the button below:
              </p>
              
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #030303; color: #ffffff; text-decoration: none; border-radius: 24px; font-size: 16px; font-weight: 500;">Reset Password</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; font-size: 14px; line-height: 1.6; color: #666;">
                Or copy and paste this link into your browser:
              </p>
              
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #666; word-break: break-all;">
                <a href="${resetUrl}" style="color: #030303; text-decoration: underline;">${resetUrl}</a>
              </p>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #856404;">
                  <strong>Important:</strong> This link will expire in ${expiresIn} hour${expiresIn !== 1 ? 's' : ''}. For security reasons, please reset your password as soon as possible.
                </p>
              </div>
              
              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #666;">
                If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.
              </p>
              
              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #666;">
                Best regards,<br>
                <strong>The ClaimStack Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; font-size: 12px; color: #999; text-align: center;">
                This email was sent to ${options.email}. If you didn't request a password reset, please ignore this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
                © ${new Date().getFullYear()} ClaimStack. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `
Reset Your ClaimStack Password

Hello ${displayName},

We received a request to reset your password for your ClaimStack account (${options.email}). If you didn't make this request, you can safely ignore this email.

To reset your password, click the link below or copy and paste it into your browser:

${resetUrl}

Important: This link will expire in ${expiresIn} hour${expiresIn !== 1 ? 's' : ''}. For security reasons, please reset your password as soon as possible.

If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.

Best regards,
The ClaimStack Team

---
This email was sent to ${options.email}. If you didn't request a password reset, please ignore this email.
© ${new Date().getFullYear()} ClaimStack. All rights reserved.
  `.trim()

  return { subject, html, text }
}

