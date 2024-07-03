import React from "react";

import styles from "./Conditions.module.scss";

const Conditions = () => {
  return (
    <div className={styles.conditions}>
      <h2>Condiciones de contratación</h2>
      <p>
        Restricción edad contratante: Desde los 18 años hasta 69 años 182 días.
      </p>
      <p>
        Restricción de edad beneficiarios. Solo podrán ingresar hijos y hermanos
        menores de 24 años 365 Días y padres o suegros menores de 69 años 182
        Días
      </p>
      <p>
        Restricción parentesco beneficiarios. Solo podrán ingresar familiares
        1er grado como padres, suegros, hermanos, hijos y cónyuges.
      </p>
      <p>
        La incorporación de una carga adicional suma un evento al máximo de
        eventos anuales de servicio a cada presentación que compone la
        asistencia.
      </p>
    </div>
  );
};

export default Conditions;
