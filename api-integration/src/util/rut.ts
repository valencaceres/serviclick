export const formatRut = (rutFull: string): string => {
  let rut: string = "";
  let dv: string = "";

  if (rutFull.indexOf("-") > 0) {
    const oRut = rutFull.split("-");
    rut = String(oRut[0].split(".").join(""));
    dv = oRut[1];
  } else {
    rut = String(rutFull.substring(0, rutFull.length - 1));
    dv = rutFull.substring(rutFull.length - 1);
  }

  rut = rut.split(".").join("");
  rut = rut.split(",").join("");
  rut = rut.replace(/(.)(?=(\d{3})+$)/g, "$1.");

  return rut + "-" + dv;
};
