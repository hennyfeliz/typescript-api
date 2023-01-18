import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

// limpiar las rutas de los nombres de los archivos...
const cleafilename = (filename: string) => {
  return filename.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleafilename(filename);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log("cargando ruta items")
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export default router;
