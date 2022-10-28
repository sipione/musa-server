const nodemailer = require("nodemailer");

class PartnershipController{

    static async sendMail(req, resp, next){
        const {name, email, phone} = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.HOSTMAIL_SMTP,
            port: process.env.PORTMAIL,
            secure: true,
            auth: {
              user: process.env.MAIL_USER, // generated ethereal user
              pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
        });

        const textHtmlToOwner = `
            <h1> Alguém quer ser parceiro no site musa</h1>
    
            <h2>NOME COMPLETO: ${name}</h2/>
            <h2>EMAIL: ${email}</h2/>
            <h2>TELEFONE: ${phone}</h2/>
        `;

        const textHtmlToPartner = `
            <h1> Olá ${name}, agradecemos o seu contato!</h1>
    
            <h2>Em breve alguém da Musa entrará em contato com você, já recebemos sua solicitação e o responsável do setor de parcerias já tem as suas informações!<h2/>
            <h3>Muito obrigado!</h3>
        `;

        try{

            await transporter.sendMail({
                from: '"Site musa" <falecomagente@mulheressa.com.br>', 
                to: "kasamatos@gmail.com", 
                subject: "Novo parceiro à vista", // plain text body
                html: textHtmlToOwner, // html body
            });

            await transporter.sendMail({
                from: '"Parcerias site Musa" <falecomagente@mulheressa.com.br>', 
                to: email, 
                subject: "Obrigado pelo interesse em ser parceiro", // plain text body
                html: textHtmlToPartner, // html body
            });

            resp.status(200).json("emails enviado com sucesso")
        }catch(err){
            resp.status(500).json(err)
        }

    }
}

module.exports = PartnershipController;