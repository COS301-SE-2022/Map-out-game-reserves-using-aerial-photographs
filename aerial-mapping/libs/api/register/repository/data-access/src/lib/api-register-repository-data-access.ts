import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import bcrypt = require('bcrypt');
import nodemailer = require('nodemailer');

@Injectable()
export class RegisterRepository {
  url: string;
  ourEmail: string;
  emailHtml: string;
  recipientEmail: string;

  constructor(private prisma: PrismaService) {
    this.url = 'http://localhost:4200';
    this.ourEmail = 'thedylpickles1@gmail.com';
    this.recipientEmail = '';
    this.emailHtml = '';
  }

  public async invite(email: string) {
    this.recipientEmail = email;
    this.emailHtml = this.getEmailHtml(email);
    //if email is already a user do not invite
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email
      }
    });

    if(user == null) {
      //check if invite exists
      const invite = await this.prisma.pending_Invites.findFirst({
        where: {
          invite_email: email
        }
      });

      //send an invite email to the email address regardless of whether an invite already exists
      const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.ourEmail,
          pass: 'znoysycmaqkhvpgk'
        }
      });

      const mailDetails = {
        from: this.ourEmail,
        to: email,
        subject: 'Aerial Mapper Registration Link',
        html: this.emailHtml
      };

      mailTransporter.sendMail(mailDetails, function (err) {
        if (err) {
          console.log('Email not sent. Error occurred when sending email using nodemailer.');
          console.log(err);

        } else {
          console.log('Email sent successfully');
        }
      });

      if(invite == null){
        //invite does not exist in db, create invite
        await this.prisma.pending_Invites.create({
          data: {
            invite_email: email
          }
        });
      }
      return "Created invite!";
    }
    return "User is already registered.";
  }

  public getEmailHtml(email: string) {
    return `<!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
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

        @media (max-width:520px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }

          .icons-inner {
            text-align: center;
          }

          .icons-inner td {
            margin: 0 auto;
          }

          .row-content {
            width: 100% !important;
          }

          .column .border,
          .mobile_hide {
            display: none;
          }

          table {
            table-layout: fixed !important;
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
    </head>
    <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
    <tbody>
    <tr>
    <td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #e6f0ff; color: #000000; width: 500px;" width="500">
    <tbody>
    <tr>
    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-bottom: 0px solid #000000; border-left: 0px solid #000000; border-right: 0px solid #000000; border-top: 0px solid #000000; padding-top: 5px; padding-bottom: 5px;" width="100%">
    <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
    <tr>
    <td>
    <div style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;">
    <p style="margin: 0;">Hi, ${email}<br/><br/>You have been approved for registration to the Aerial Mapper by the administrator!🎉<br/><br/>Please click the button below and finish the registration process. 👇</p>
    </div>
    </td>
    </tr>
    </table>
    <table border="0" cellpadding="10" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
    <tr>
    <td>
    <div align="center">
    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${this.url}/register" style="height:42px;width:91px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#394aa7"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:4200/register" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#394aa7;border-radius:4px;width:auto;border-top:1px solid #394aa7;font-weight:700;border-right:1px solid #394aa7;border-bottom:1px solid #394aa7;border-left:1px solid #394aa7;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; mso-line-height-alt: 32px;">Register</span></span></a>
    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
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
    </body>
    </html>`
  }

  public async removePendingInvite(email: string) {
    try {
      await this.prisma.pending_Invites.delete({
        where: { invite_email: email }
      })
      return true;
    }
    catch(_e) {
      console.log("Invite does not exist.");
      return false;
    }
  }

  public async createUser(name: string, email: string, password: string, role: string, approved: boolean) {
    let error: Error | null = null;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        error = err;
      }
      bcrypt.hash(password, salt, async (_rr, hash) => {
        if (err) {
          error = err;
        }
        await this.prisma.user.create({
          data: {
            user_name: name,
            user_email: email,
            user_password: hash,
            user_password_salt: salt,
            user_role: role,
            user_approved: approved
          }
        });
      });
    });

    if (error == null) {
      return "Created user!";
    }
    return error;
  }

}
