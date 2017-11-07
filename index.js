"use strict";
import app from './src/app';

const port = 7001;

app()
  .then(app => app.listen(port, () => console.log(`Servidor HTTP escutando na porta ${port}`)))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
