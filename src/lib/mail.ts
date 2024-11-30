import { format } from "date-fns";
import { transporter } from "./nodemailer";


const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: `"Jayma Bio Innovations" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: "Please verify your email.",
    html: `<html dir="ltr" lang="en">

<head>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>

<body
  style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
    style="max-width:37.5em">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
            <tbody>
              <tr>
                <td><img src="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                    style="padding:20px 40px;padding-bottom:0">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column">
                          <h1 style="font-size:32px;font-weight:bold;text-align:left">Hi ${name},</h1>
                          <h2 style="font-size:26px;font-weight:bold;text-align:start">We noticed a recent attempt to
                            Register for an  account with your email.</h2>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">To complete your registration, please click the button below:</p>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                            role="presentation">
                            <tr>
                              <td align="center" style="padding: 30px 0;">
                                <a href="${confirmLink}"
                                  style="background-color: #000000; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">Confirm
                                  Registration</a>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">If you didn't attempt to register
                            for an account, please disregard this email. Your account security is important to us,
                            and no action is required on your part.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">If you have any questions or
                            concerns, please don't hesitate to contact our support team.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">Best regards,<br><a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:45px 0 0 0">
            <tbody>
              <tr>
                <td><img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&amp;w=1920&amp;q=75" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 |
            <a href="https://jaymabioinnovations.com" target="_blank">Jayma Bio Innovations Pvt Ltd</a> developed by <a href="https://exions.tech"
              target="_blank">Exions Tech</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const resetPasswordLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: `"Jayma Bio Innovations" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: "Account Password Reset.",
    html: `<html dir="ltr" lang="en">
<head>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
</head>
<body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 20px"></table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
            <tbody>
              <tr>
                <td>
                  <img src="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" style="display:block;outline:none;border:none;text-decoration:none" width="620"/>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 40px;">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column">
                          <h1 style="font-size:32px;font-weight:bold;text-align:left;margin-bottom:20px;">Hi ${name},</h1>
                          <h2 style="font-size:26px;font-weight:bold;text-align:left;margin-bottom:30px;">We noticed a recent attempt to reset your account password.</h2>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">If this was you, please click the button below to reset your password:</p>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tr>
                              <td align="center" style="padding: 30px 0;">
                                <a href="${resetPasswordLink}" style="background-color: #000000; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">Reset Password</a>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">If this wasn't you, please ignore this email. Your account security is important to us.</p>
                        <p style="font-size:18px;line-height:24px;margin:16px 0;">If you have any questions or
                            concerns, please don't hesitate to contact our support team.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">Best regards,<br><a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:45px 0 0 0">
            <tbody>
              <tr>
                <td><img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&amp;w=1920&amp;q=75" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 |
            <a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a> developed by <a href="https://exions.tech"
              target="_blank">Exions Tech</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
  });
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  name: string
) => {
  await transporter.sendMail({
    from: `"Jayma Bio Innovations" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: "Confirm Login Attempt.",
    html: `<html dir="ltr" lang="en">
<head>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH"/>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
</head>
<body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 20px"></table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
            <tbody>
              <tr>
                <td>
                  <img src="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" style="display:block;outline:none;border:none;text-decoration:none" width="620"/>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 40px;">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column">
                          <h1 style="font-size:32px;font-weight:bold;text-align:left;margin-bottom:20px;">Hi ${name},</h1>
                          <h2 style="font-size:26px;font-weight:bold;text-align:left;margin-bottom:30px;">We noticed a recent attempt to log in to your ExLan account.</h2>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">To complete the login process, please enter the following 2FA verification code:</p>
                          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tr>
                              <td align="center" style="padding: 30px 0;">
                                <span style="background-color: #f0f0f0; color: #000000; padding: 14px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 24px; letter-spacing: 5px;">${token}</span>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">This code will expire in 5 minutes. If you didn't attempt to log in, please ignore this email and consider changing your password for security reasons.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">If you have any questions or concerns, please don't hesitate to contact our support team.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">Best regards,<br><a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:45px 0 0 0">
            <tbody>
              <tr>
                <td><img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&amp;w=1920&amp;q=75" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 |
            <a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a> developed by <a href="https://exions.tech"
              target="_blank">Exions Tech</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
  });
};

export const subcribedNewsleter = async (email: string) => {
  await transporter.sendMail({
    from: `"Jayma Bio Innovations" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: "Subcribed to Newsletter.",
    html: `<html dir="ltr" lang="en">

<head>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>

<body
  style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
    style="max-width:37.5em">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:30px 20px"></table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
            <tbody>
              <tr>
                <td>
                  <img src="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" style="display:block;outline:none;border:none;text-decoration:none" width="620"/>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                    style="padding:30px 40px;">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column">
                          <h2 style="font-size:26px;font-weight:bold;text-align:left;margin-bottom:30px;">
                            Welcome to Jayma Bio Innovations – Thank You for Subscribing!
                          </h2>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">Thank you for joining the Jayma Bio Innovations Pvt Ltd. We’re excited to have you with us on our journey to pioneering sustainable bio-innovation and creating eco-friendly solutions that make a positive impact.</p>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">As a subscriber, you’ll receive the latest updates on our projects, breakthrough research, industry insights, and tips for a sustainable lifestyle, directly to your inbox.</p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">
                            Stay tuned for inspiring content and exclusive offers as we work towards a greener future together!
                          </p>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">Best regards,<br><a
                              href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:45px 0 0 0">
            <tbody>
              <tr>
                <td><img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&amp;w=1920&amp;q=75" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 |
            <a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a> developed by <a
              href="https://exions.tech" target="_blank">Exions Tech</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
  });
};

export const sendEventNewsletter = async (
  email: string,
  title: string,
  description: string,
  date: string,
  eventId: string
) => {
  const info = await transporter.sendMail({
    from: `"Jayma Bio Innovations" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: `New Event: ${title}`,
    html: `<html dir="ltr" lang="en">

<head>
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <link rel="preload" as="image" href="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>

<body
  style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
    style="max-width:37.5em">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:30px 20px"></table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
            <tbody>
              <tr>
                <td>
                  <img src="https://utfs.io/f/aoQyAq6fictrObn6USip9naGtPDMNeS7jURlyO2zvkVfbAmH" style="display:block;outline:none;border:none;text-decoration:none" width="620"/>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                    style="padding:30px 40px;">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column">
                          <h2 style="font-size:26px;font-weight:bold;text-align:left;margin-bottom:30px;">
                            See Our Latest Event – ${title}
                          </h2>
                       
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">
                            ${description}
                          </p>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">
                           Event Date:  ${format(new Date(date), "EEEE, MMMM d, yyyy")}
                          </p>
                          <p style="font-size:18px;line-height:24px;margin:20px 0;text-align:left;">
                           Event Time:  ${format(new Date(date), "hh:mm a")}
                          </p>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tr>
                              <td align="center" style="padding: 30px 0;">
                                <a href="https://jaymabioinnovations.com/events/${eventId}" style="background-color: #000000; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">
                                  View Event
                                </a>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size:18px;line-height:24px;margin:16px 0;">Best regards,<br><a
                              href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
            style="padding:45px 0 0 0">
            <tbody>
              <tr>
                <td><img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&amp;w=1920&amp;q=75" style="display:block;outline:none;border:none;text-decoration:none" width="620" />
                </td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 |
            <a href="https://jaymabioinnovations.com/" target="_blank">Jayma Bio Innovations Pvt Ltd</a> developed by <a
              href="https://exions.tech" target="_blank">Exions Tech</a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
  });

  return info;
};
