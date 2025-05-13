export const verifyEmailTemplate = (name, verifyUrl , msg) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .email-container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
        }
        .email-body {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            color : white;
            text-fecoration : none;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.8em;
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Verification</h1>
        </div>
        <div class="email-body">
            <p>Hi ${name},</p>
            <p>${msg}</p>
            <a href="${verifyUrl}" class="button">Click Me</a>
            <p>If you did not create an account, no further action is required.</p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
