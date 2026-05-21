export const baseTemplate = (title: string, body: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            background-color: #f8fafc;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 0;
          }
          .content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .body {
            padding: 30px;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background-color: #003128;
            color: #ffffff !important;
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 4px;
            margin: 20px 0px;
          }
          .footer {
            background-color: #ffffff;
            font-size: 10px;
            padding: 20px 30px;
            display: flex;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="content">
            ${body}
          <div class="footer">
            <img src="cid:email-footer-logo" width="200" />
          </div>
        </div>
      </body>
    </html>
  `;
};
