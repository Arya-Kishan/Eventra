export const getTaskNotificationHtml = (name, title, description) => {
  let html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            line-height: 0;
            font-size: 75%;
        }

        .menu_block.desktop_hide .menu-links span {
            mso-hide: all;
        }

        @media (max-width:690px) {

            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .image_block div.fullWidth {
                max-width: 100% !important;
            }

            .menu-checkbox[type=checkbox]~.menu-links {
                display: none !important;
                padding: 5px 0;
            }

            .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-open {
                display: none !important;
            }

            .menu-checkbox[type=checkbox]:checked~.menu-links,
            .menu-checkbox[type=checkbox]~.menu-trigger {
                display: block !important;
                max-width: none !important;
                max-height: none !important;
                font-size: inherit !important;
            }

            .menu-checkbox[type=checkbox]~.menu-links>a,
            .menu-checkbox[type=checkbox]~.menu-links>span.label {
                display: block !important;
                text-align: center;
            }

            .menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-close {
                display: block !important;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }

        #memu-r0c1m1:checked~.menu-links {
            background-color: #5855bd !important;
        }

        #memu-r0c1m1:checked~.menu-links a,
        #memu-r0c1m1:checked~.menu-links span {
            color: #ffffff !important;
        }
    </style>
    <!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body"
    style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center; background-color: #ffffff; color: #000000; width: 670px; margin: 0 auto;"
                                        width="670">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:30px;line-height:30px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#61697a;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word;">Hi
                                                                        user,</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
                                                                <div
                                                                    style="color:#1f0b0b;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:46px;line-height:120%;text-align:left;mso-line-height-alt:55.199999999999996px;">
                                                                    <p style="margin: 0; word-break: break-word;">
                                                                        <strong><span
                                                                                style="word-break: break-word;">Reminder
                                                                                !</span></strong>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-4" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:10px;">
                                                                <div
                                                                    style="color:#393d47;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                                                                    <p style="margin: 0; word-break: break-word;">This
                                                                        is a reminder for your created task <span
                                                                            style="color:#0f43ff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;line-height:150%;text-align:left;mso-line-height-alt:21px;">${title} : ${description}</span> on date 02/12/2024 by you
                                                                        and update the task on your account and don't forget to explore the space</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-5" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;text-align:left;">
                                                                <div class="alignment" align="left"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:52px;width:189px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#5855bd">
<w:anchorlock/>
<v:textbox inset="5px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
<![endif]-->
                                                                    <a href="https://arya-web-book.netlify.app/home/tasks"
                                                                        style="background-color:#5855bd;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;border-radius:4px;border-right:0px solid #8a3b8f;border-top:0px solid #8a3b8f;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:10px;padding-top:10px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;">
                                                                        <span
                                                                            style="word-break: break-word; padding-left: 50px; padding-right: 45px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 32px;"><strong>Visit
                                                                                    Site</strong></span></span>
                                                                    </a>
                                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:50px;line-height:50px;font-size:1px;">&#8202;
                                                    </div>
                                                    <div class="spacer_block block-2 mobile_hide"
                                                        style="height:50px;line-height:50px;font-size:1px;">&#8202;
                                                    </div>
                                                    <div class="spacer_block block-3 mobile_hide"
                                                        style="height:50px;line-height:50px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="image_block block-4" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="padding-right:5px;width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 330px;"><img loading="lazy"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1826/Image_1.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="330" alt="Alternate text"
                                                                            title="Alternate text" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-5"
                                                        style="height:50px;line-height:50px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>`;

  return html;
};

export const getNewUserNotificationHtml = (name, email) => {
  let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        img {
            width: 200px;
        }

        a {
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(32, 192, 32);
            border: none;
            text-decoration: none;
            color: black;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <img loading="lazy" src="https://i.pinimg.com/564x/37/45/c7/3745c74779c298de86aa3fa65aba4016.jpg" alt="" srcset="">

    <h1>New User Joined</h1>
    <p>Name : ${name}</p>
    <p>Email : ${email}</p>


    <a href="https://arya-web-book.netlify.app">Visit WebBook</a>

</body>

</html>`;

  return html;
};

export const signUpTemplate = (name) => {
  let html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            line-height: 0;
            font-size: 75%;
        }

        #converted-body .list_block ul,
        #converted-body .list_block ol,
        .body [class~="x_list_block"] ul,
        .body [class~="x_list_block"] ol,
        u+.body .list_block ul,
        u+.body .list_block ol {
            padding-left: 20px;
        }

        .menu_block.desktop_hide .menu-links span {
            mso-hide: all;
        }

        @media (max-width:700px) {

            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .image_block div.fullWidth {
                max-width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
    <!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body"
    style="background-color: #cccccc; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cccccc;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ff8516; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="20" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 150px;"><h1>WEBBOOK</h1></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/header-bkg-mail.png'); background-position: center top; background-repeat: no-repeat; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:40px;line-height:40px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="image_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 306px;"><h1></h1></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:10px;padding-right:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px;letter-spacing:10px;line-height:120%;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">WELCOME
                                                                        </span><span
                                                                            style="word-break: break-word;">${name}</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-4"
                                                        style="height:20px;line-height:20px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="button_block block-5" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:38px;width:130px;v-text-anchor:middle;" arcsize="27%" stroke="false" fillcolor="#4106a2">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ebe6d6;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><a href="https://arya-web-book.netlify.app/" target="_blank" style="background-color:#4106a2;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:10px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ebe6d6;display:inline-block;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: 1px;"><span
                                                                                style="word-break: break-word; line-height: 28.8px;">Discover</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div class="fullWidth" style="max-width: 340px;">
                                                                        <img loading="lazy" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/header-pic.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="340" alt="Ghost Hero Pic"
                                                                            title="Ghost Hero Pic" height="auto">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:20px;line-height:20px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#ff8516;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:38px;line-height:150%;text-align:center;mso-line-height-alt:57px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;"><strong><span
                                                                                    style="word-break: break-word;">EXPLORE ONLINE!!!</span></strong></span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Webbook is a online website made with MERN stack providing a valuable service </span></p>
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Create task, save notes, view interview questions and check mcq's</span></p>
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Explore globally shared notes,questions or mcq on global tab's</span></p>
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Happy Journey</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:60px;line-height:60px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/contest-background-email.png'); background-repeat: no-repeat; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 269px;"><img loading="lazy"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/costume-pic.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="269" alt="Costume Picture"
                                                                            title="Costume Picture" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#ff8516;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Task</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">CREATE A
                                                                            TASK</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Create a
                                                                            task for yourself and set a reminder on
                                                                            particular date. The reminder will be
                                                                            notified through Gmail. Toggle Betwwen the
                                                                            completed and incompleted task </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="left"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:40px;width:140px;v-text-anchor:middle;" arcsize="25%" strokeweight="0.75pt" strokecolor="#FF8516" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ebe6d6;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><a href="https://arya-web-book.netlify.app/home/tasks" target="_blank"
                                                                        style="background-color:transparent;border-bottom:1px solid #FF8516;border-left:1px solid #FF8516;border-radius:10px;border-right:1px solid #FF8516;border-top:1px solid #FF8516;color:#ebe6d6;display:inline-block;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 28.8px;">Explore
                                                                                more</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:30px;line-height:30px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/contest-background-email.png'); background-repeat: no-repeat; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 269px;"><img loading="lazy"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/carving-pic.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="269" alt="Carving Picture"
                                                                            title="Carving Picture" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#ff8516;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Notes</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">SAVE
                                                                            NOTES</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Save your
                                                                            notes online and even share your notes with
                                                                            your friends. Create, edit or delete your
                                                                            notes. Make your notes globally available to
                                                                            everyone </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="left"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:40px;width:140px;v-text-anchor:middle;" arcsize="25%" strokeweight="0.75pt" strokecolor="#FF8516" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ebe6d6;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><a href="https://arya-web-book.netlify.app/home/notes" target="_blank"
                                                                        style="background-color:transparent;border-bottom:1px solid #FF8516;border-left:1px solid #FF8516;border-radius:10px;border-right:1px solid #FF8516;border-top:1px solid #FF8516;color:#ebe6d6;display:inline-block;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 28.8px;">Explore
                                                                                more</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:30px;line-height:30px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/contest-background-email.png'); background-repeat: no-repeat; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 269px;"><a
                                                                            href="Desserts Picture" target="_blank"
                                                                            style="outline:none" tabindex="-1"><img loading="lazy"
                                                                                src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/desserts-pic.png"
                                                                                style="display: block; height: auto; border: 0; width: 100%;"
                                                                                width="269" alt="Desserts Picture"
                                                                                title="Desserts Picture"
                                                                                height="auto"></a></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#ff8516;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Interview</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">View
                                                                            Questions</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Checkout the
                                                                            interview questions shared globally for
                                                                            interview preparation related to your filed
                                                                            and even make your own interview book and
                                                                            save online</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="left"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:40px;width:140px;v-text-anchor:middle;" arcsize="25%" strokeweight="0.75pt" strokecolor="#FF8516" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ebe6d6;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><a href="https://arya-web-book.netlify.app/home/interview" target="_blank"
                                                                        style="background-color:transparent;border-bottom:1px solid #FF8516;border-left:1px solid #FF8516;border-radius:10px;border-right:1px solid #FF8516;border-top:1px solid #FF8516;color:#ebe6d6;display:inline-block;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 28.8px;">Explore
                                                                                more</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:60px;line-height:60px;font-size:1px;">&#8202;
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/contest-background-email.png'); background-repeat: no-repeat; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 269px;"><img loading="lazy"
                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7676/costume-pic.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="269" alt="Costume Picture"
                                                                            title="Costume Picture" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2" width="50%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="paragraph_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                                                <div
                                                                    style="color:#ff8516;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Mcq</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Pratice
                                                                            MCQ's</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#ebe6d6;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                            style="word-break: break-word;">Check mcq's
                                                                            available globally on react, javascript,
                                                                            express and on others related topics at one
                                                                            place. Give your brain a chance to brush up
                                                                            skills</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="left"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:40px;width:140px;v-text-anchor:middle;" arcsize="25%" strokeweight="0.75pt" strokecolor="#FF8516" fill="false">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ebe6d6;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><a href="https://arya-web-book.netlify.app/home/mcq" target="_blank"
                                                                        style="background-color:transparent;border-bottom:1px solid #FF8516;border-left:1px solid #FF8516;border-radius:10px;border-right:1px solid #FF8516;border-top:1px solid #FF8516;color:#ebe6d6;display:inline-block;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 28.8px;">Explore
                                                                                more</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="row row-27" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #180632; color: #000000; width: 680px; margin: 0 auto;"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:40px;line-height:40px;font-size:1px;"> 
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    </table>


    </td>
    </tr>
    </tbody>
    </table><!-- End -->
</body>

</html>`;

  return html;
};

export const HTMLOtpTemplate = (otpCode, name) => {
  let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
      }

      img {
        width: 200px;
      }
    </style>
  </head>

  <body>
    <img
      loading="lazy"
      src="https://res.cloudinary.com/dwvuqahw2/image/upload/v1768750546/ic_launcher_mmi9bt.png"
      alt=""
      srcset=""
    />

    <p>Hi ${name}</p>

    <p>Your one-time verification code is:</p>

    <h3>${otpCode}</h3>

    <p>This code will expire in 10 minutes.</p>
    <p>For your security, please do not share this code with anyone.</p>

    <p>If you didn’t request this, you can safely ignore this email.</p>

    <p>Thanks,</p>
    <p>The Eventra Team</p>
  </body>
</html>
`;
  return html;
};
