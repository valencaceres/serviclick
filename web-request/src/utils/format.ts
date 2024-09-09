function format(rut: string | number): string {
    const rutStr = typeof rut === 'number' ? rut.toString() : rut;
  
    const cleanRut = rutStr.replace(/\D/g, '');
  
    if (cleanRut.length < 8) {
      return cleanRut;
    }
  
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const formattedBody = body.replace(/(\d)(\d{3})(\d{3})$/, '$1.$2.$3')
                              .replace(/(\d)(\d{3})$/, '$1.$2');
    return `${formattedBody}-${dv}`;
  }

export default format