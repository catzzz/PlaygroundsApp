const nodemailer = require("nodemailer");
const {google} = require('googleapis');
const ExpressError = require('./ExpressError');
const oAuth2Client = new google.auth.OAuth2(
                            process.env.GMAIL_CLIENT_ID,
                            process.env.GMAIL_CLIENT_SECRET,
                            process.env.GMAIL_REDIRECT_URL);

oAuth2Client.setCredentials({refresh_token:process.env.GMAIL_REFRESH_TOKEN});
            
const sendGamil = async(toEmail, htmlText)=>{
    try {
        const acessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:process.env.GMAIL_USER,
                clientId:process.env.GMAIL_CLIENT_ID,
                clientSecret:process.env.GMAIL_CLIENT_SECRET,
                refreshToken:process.env.GMAIL_REFRESH_TOKEN,
                accessToken:acessToken
            }
        })
        const mailOpetions = {
            from:`JIMMY LEU 📧 <${process.env.GMAIL_USER}>`,
            to:toEmail,
            subject:"Reset Your Bee's Playgrounds Password",
            html: htmlText,
        };
      
        const result = await transporter.sendMail(mailOpetions);
        console.log(result);
    }catch(e){
        throw new ExpressError(e, 500)
    }

}


module.exports = sendGamil;