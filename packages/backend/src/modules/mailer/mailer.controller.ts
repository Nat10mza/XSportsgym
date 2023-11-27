import { Request, Response } from "express";
import nodemailer from "nodemailer";

const Suscriptionhtml = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Descripción de la página" />
    <meta name="author" content="Autor de la página" />
    <style>
      * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #fff;
        color: #000;
        font-size: 16px;
        line-height: 1.5;
      }
      header {
        background-color: #fff;
        color: #000;
        padding: 20px;
        text-align: center;
      }
      h1 {
        font-size: 36px;
        margin-bottom: 20px;
      }
      p {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .logo {
        display: block;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        background-image: url('frontend/src/assets/crossfit.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      footer {
        background-color: #fff;
        color: #000;
        padding: 20px;
        text-align: center;
      }
      a {
        color: #ff0000;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Bienvenido a nuestra comunidad</h1>
    </header>
    <div class="container">
    <p>
      ¡Gracias por suscribirte a nuestra página! Nos emociona tenerte como parte
      de nuestra comunidad y esperamos que disfrutes de los recursos y contenido
      que ofrecemos.
    </p>
    <p>
      Como muestra de agradecimiento te regalamos UNA CLASE GRATIS!!!!!
    </p>
    <p>
      En nuestra página encontrarás información valiosa sobre el fitness, incluyendo artículos, tutoriales, guías, videos y mucho más.
    </p>
    <p>
      Para mantenerte actualizado sobre nuestras últimas publicaciones y
      novedades, asegúrate de seguirnos en nuestras redes sociales @xsportsclub.
    </p>
    <p>
      Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto
      con nosotros. Estamos siempre dispuestos a ayudar y a escuchar tus
      sugerencias para mejorar nuestra página.
    </p>
    <p>
      ¡Gracias de nuevo por unirte a nuestra comunidad! Esperamos verte pronto
      en nuestra página.
    </p>
    <p>Atentamente,</p>
    <p>X Sports Club</p>
  </body>`;

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeMail(req: Request, res: Response) {
  const name = req.body.name;

  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Bienvenido a nuestra pagina",
    html: `<div> <p> Gracias ${name} haberte registrado en nuestra pagina
    web. Aqui
    encontraras
    lo mejores productos de gimnasio al mejor precio! </p></div>`,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendLoginMail(req: Request, res: Response) {
  const name = req.body.name;
  if (!name) {
    await transport.sendMail({
      from: process.env.EMAIL,
      to: req.body.to,
      subject: "Has iniciado sesión",
      html: `<div> <p> Has iniciado sesion en nuestra pagina web.</p></div>`,
    });
    //console.log(result)
    return res.status(200).send("The mail was sent");
  }
  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Has iniciado sesión",
    html: `<div> <p> ${name} has iniciado sesion en nuestra pagina web.</p></div>`,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendSuscriptionMail(req: Request, res: Response) {
  // console.log(to);

  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: "Bienvenido a nuestra pagina",
    html: Suscriptionhtml,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendContactMail(req: Request, res: Response) {
  // console.log(to);
  const a = `<p>Nombre:${req.body.name}</p>
<p>Email:${req.body.email}</p>
<p>Domicilio:${req.body.location}</p>
<p>Mensaje:${req.body.message}</p>
`;
  await transport.sendMail({
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `${req.body.name} quiere contactarse contigo`,
    html: `<p>Nombre: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <p>Domicilio: ${req.body.location}</p>
    <p>Mensaje: ${req.body.message}</p>
    `,
  });
  //console.log(result)
  return res.status(200).send("The mail was sent");
}

export async function sendEmailUpdate(req: Request, res: Response) {
  const subjectValue = "Tus datos de usuario fueron actualizados";
  const bodyValue = `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Descripción de la página" />
      <meta name="author" content="Autor de la página" />
      <style>
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: #fff;
          color: #000;
          font-size: 16px;
          line-height: 1.5;
        }
        header {
          background-color: #fff;
          color: #000;
          padding: 20px;
          text-align: center;
        }
        h1 {
          font-size: 36px;
          margin-bottom: 20px;
        }
        p {
          font-size: 20px;
          margin-bottom: 20px;
        }
        .logo {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
          background-image: url('frontend/src/assets/crossfit.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        footer {
          background-color: #fff;
          color: #000;
          padding: 20px;
          text-align: center;
        }
        a {
          color: #ff0000;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <h1> Xsportsclub </h1>
      <h2> Tus datos de usuario fueron actualizados con éxito </h2>
      <p>Nombre: ${req.body.name} <p/>
      <p>Estado: ${req.body.state} <p/> 
      <p>Rol: ${req.body.role} <p/>
      
    </body>`;

  await transport.sendMail({
    from: process.env.EMAIL,
    to: req.body.to,
    subject: subjectValue,
    html: bodyValue,
    attachments: [],
  });
  return res.status(200).send("The mail was sent");
}
