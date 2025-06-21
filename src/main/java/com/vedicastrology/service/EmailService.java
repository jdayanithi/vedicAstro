package com.vedicastrology.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.email.from-name}")
    private String fromName;

    /**
     * Send welcome email to new Google OAuth user with their generated password
     */
    public void sendWelcomeEmailToGoogleUser(String toEmail, String firstName, String lastName, String generatedPassword) {
        try {
            logger.info("📧 Sending welcome email to new Google user: {}", toEmail);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to VedicAstro - Your Account Details");

            String htmlContent = buildWelcomeEmailContent(firstName, lastName, toEmail, generatedPassword);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("✅ Welcome email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            logger.error("❌ Failed to send welcome email to {}: {}", toEmail, e.getMessage(), e);
            throw new RuntimeException("Failed to send welcome email", e);
        } catch (Exception e) {
            logger.error("💥 Unexpected error sending welcome email to {}: {}", toEmail, e.getMessage(), e);
            throw new RuntimeException("Unexpected error sending welcome email", e);
        }
    }

    /**
     * Build HTML content for the welcome email
     */    private String buildWelcomeEmailContent(String firstName, String lastName, String email, String generatedPassword) {
        String template = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to VedicAstro</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .welcome-message { font-size: 18px; margin-bottom: 20px; }
                    .credentials-box { background: #e8f4fd; border: 1px solid #b3d7f0; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .credentials-title { font-weight: bold; color: #1976d2; margin-bottom: 10px; }
                    .credential-item { margin: 10px 0; }
                    .credential-label { font-weight: bold; display: inline-block; width: 100px; }
                    .password-highlight { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px; }
                    .important-note { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                    .button { display: inline-block; background: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .features { margin: 20px 0; }
                    .feature-item { margin: 10px 0; padding-left: 20px; position: relative; }
                    .feature-item:before { content: "✨"; position: absolute; left: 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🌟 Welcome to VedicAstro! 🌟</h1>
                    <p>Your journey into Vedic Astrology begins here</p>
                </div>
                
                <div class="content">
                    <div class="welcome-message">
                        <p>Dear <strong>%s %s</strong>,</p>
                        <p>Welcome to VedicAstro! We're excited to have you join our community of astrology enthusiasts. Your account has been successfully created using your Google account.</p>
                    </div>

                    <div class="credentials-box">
                        <div class="credentials-title">🔐 Your Account Details</div>
                        <div class="credential-item">
                            <span class="credential-label">Email:</span> %s
                        </div>
                        <div class="credential-item">
                            <span class="credential-label">Login Method:</span> Google OAuth (Primary)
                        </div>
                        <div class="credential-item">
                            <span class="credential-label">Backup Password:</span>
                            <div class="password-highlight">%s</div>
                        </div>
                    </div>

                    <div class="important-note">
                        <strong>🔒 Important Security Information:</strong><br>
                        • Your primary login method is through Google Sign-In<br>
                        • The backup password above is for emergency access only<br>
                        • Please store this password securely and do not share it<br>
                        • You can change this password anytime in your account settings
                    </div>

                    <div class="features">
                        <h3>🌙 What you can do with VedicAstro:</h3>
                        <div class="feature-item">Access personalized astrological insights</div>
                        <div class="feature-item">Explore comprehensive birth chart analysis</div>
                        <div class="feature-item">Learn from expert astrology courses</div>
                        <div class="feature-item">Connect with certified astrologers</div>
                        <div class="feature-item">Track planetary transits and their effects</div>
                    </div>

                    <div style="text-align: center;">
                        <a href="http://localhost:4200/dashboard" class="button">Get Started Now</a>
                    </div>

                    <div class="footer">
                        <p>Thank you for choosing VedicAstro!</p>
                        <p>If you have any questions, please contact our support team.</p>
                        <p><em>Best regards,<br>The VedicAstro Team</em></p>
                    </div>
                </div>
            </body>
            </html>
            """;
        
        return String.format(template, firstName, lastName, email, generatedPassword);
    }

    /**
     * Send a simple text email (fallback method)
     */
    public void sendSimpleEmail(String toEmail, String subject, String text) {
        try {
            logger.info("📧 Sending simple email to: {}", toEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);
            logger.info("✅ Simple email sent successfully to: {}", toEmail);
            
        } catch (Exception e) {
            logger.error("❌ Failed to send simple email to {}: {}", toEmail, e.getMessage(), e);
            throw new RuntimeException("Failed to send simple email", e);
        }
    }
}
