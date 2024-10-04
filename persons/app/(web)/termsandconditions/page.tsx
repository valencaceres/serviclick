import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Términos y condiciones",
    template: `%s - ${"Términos y condiciones"}`,
  },
  description: "Términos y condiciones",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function TermsPage() {
  return (
    <section className="container flex max-w-5xl flex-col gap-8 py-8">
      <h1 className="text-xl font-bold uppercase">MHM SERVICIOS SPA.</h1>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">Primero: </span>Antecedentes
        </h2>
        <p>
          1.- MHM SERVICIOS SPA Rol Único Tributario N°76.721.251-8, ubicada en
          la comuna y ciudad de Santiago, en calle Huérfanos 669, piso 7, comuna
          de Santiago, Región Metropolitana, en adelante SERVICLICK, ofrece
          diversas funciones y alternativas de asistencias para personas,
          empresas, fundaciones, sindicatos, banca, retail, mediante los canales
          de atención, definidos más adelante, que pone a disposición del
          público.
        </p>
        <p>
          2.- Las funciones que ofrece SERVICLICK, el acceso y uso de los
          canales de atención por parte de las personas que lo requieran y las
          normas relativas al almacenamiento, tratamiento, uso y disposición de
          los datos personales de éstas, se regulan por los siguientes Términos
          y Condiciones, así como por la legislación vigente, especialmente por
          la Ley Nº 19.496 sobre Protección de los Derechos de los Consumidores
          y por la Ley Nº19.628 sobre Protección de la Vida Privada. Las
          personas que acepten los Términos y Condiciones se denominarán, para
          los efectos de este documento, como “Usuarios”.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">SEGUNDO:</span> CANALES DE ATENCIÓN
        </h2>
        <p>
          1.- Actualmente los Canales de Atención están constituidos por: El
          sitio web www.serviclick.cl; El botón de pago de SERVICLICK ubicado en
          sitios web distintos de www.serviclick.cl para iOS y Android,
          consistentes en dispositivos ubicados en lugares de fácil acceso al
          público y en los cuales las personas pueden obtener comprobantes de
          pagos y copia de sus membresías. La sola visita del Sitio no te impone
          obligación alguna, a menos que hayas expresado en forma inequívoca y
          mediante actos positivos, tu voluntad de adquirir uno o más servicios,
          en la forma indicada en este texto precedente.
        </p>
        <p>
          2- Para la utilización de algunos Canales de Atención el sistema
          entregará la opción de registro, para tener acceso a contratar uno o
          más servicios, quedando a decisión del futuro Usuario. Sin perjuicio
          de lo anterior, SERVICLICK podrá exigir el registro para algún canal
          específico o para acceder a algunas funcionalidades o programas de
          fidelización. En todos los casos, se deberán aceptar expresamente los
          Términos y Condiciones.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">TERCERO:</span> RESPONSABILIDAD.
        </h2>
        <p>
          1.- Es requisito para ser Usuario, el cabal y completo conocimiento y
          aceptación sin reservas de los presentes Términos y Condiciones. El
          uso indebido de los Canales de Atención, el incumplimiento de lo
          establecido en el presente instrumento o cualquier acción u omisión
          que implique algún tipo de fraude en contra de La Compañía, facultará
          a esta última para bloquear al participante del uso de los Canales de
          Atención, sin perjuicio del ejercicio de las acciones legales que
          pudieren corresponder.
        </p>
        <p>
          2.- En el caso que el Usuario se haya registrado, es él el responsable
          de las actividades que se realicen en su cuenta y/o con su clave de
          acceso, por lo que debe tomar todos los resguardos necesarios para
          proteger y asegurar la confidencialidad y reserva de su contraseña. En
          caso de creer que su contraseña ha sido conocida por otra persona o en
          caso de haber sido, o pudiere ser, utilizada de manera no autorizada,
          el Usuario debe informar dicha situación a SERVICLICK de inmediato al
          correo electrónico info@serviclick.cl, o contactarse el fono al fono
          600 086 0580, así como reemplazarla por una nueva mediante el
          procedimiento establecido para tales efectos.
        </p>
        <p>
          3.- Cuando los Usuarios proporcionen información inexacta, incompleta
          y/o falsa, la SERVICLICK se reserva el derecho de negar el acceso a
          los Canales de Atención y/o a los servicios contratados.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">CUARTO:</span> PAGO DE SUSCRIPCIONES.
        </h2>
      </div>
      <p>
        1.- Para realizar el pago de suscripciones previamente inscritas, el
        Usuario debe ser capaz de acuerdo a la legislación chilena.
      </p>
      <p>
        2.- El pago del o los servicios queda sujeto a que se verifiquen las
        siguientes condiciones copulativas: (i) que se efectúe el pago
        correspondiente; (ii) que se valide la operación; (iii) que se confirme
        la transacción; y, (iv) que el medio de pago propuesto por el Usuario
        sea aceptado. Cumplidas las condiciones recién señaladas, se entregará
        una confirmación por escrito o en papel, enviada a la dirección de
        correo electrónico proporcionada por el Usuario, o a su teléfono móvil o
        despachado mediante cualquier otro medio que garantice su debido y
        oportuno conocimiento e integridad.
      </p>
      <p>
        3.- El pago de el o los servicios se podrá realizar por: i) Tarjetas de
        débito y tarjetas de crédito emitidas en Chile. Respecto de estas
        tarjetas, su pago se realizará a través de los dispositivos de operación
        (POS) ubicado en cada sistema WebPay y/o Onepay y/o bien a través de los
        sistemas o medios que se encuentren implementados o en el futuro se
        implementen para estos efectos. ii) Cargo directo a la cuenta del
        cliente en los Bancos o Instituciones Financieras afiliadas o no a
        SERVICLICK.
      </p>
      <p>
        4.- Con respecto de la falta de pago recurrente por parte del cliente,
        se hace presente qué, este servicio es un producto anual, el cual se
        podrá cancelar de una y hasta doce cuotas mensuales y sucesivas. En
        razón de esto el cliente declara conocer lo establecido en la Leyes
        19.046 y 19.659, Código Civil, Código de Comercio y sus leyes
        complementarias, en consecuencia, el cliente reconoce, entiende y acepta
        que el no cumplimiento de las obligaciones contrariadas en presente
        instrumento privado podría originar cargos adicionales de interés y
        gestiones de cobranza.
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">QUINTO:</span> Política de Privacidad y
          Uso de Información Personal
        </h2>
      </div>
      <p>
        1.- Consentimiento al Uso de Datos Personales. Los Usuarios consienten
        expresamente en el tratamiento de sus datos personales, en conformidad a
        la legislación vigente y especialmente a lo prescrito por la Ley, en
        especial en el tratamiento de aquellos en consideración a su correcta
        individualización, así como su información de contacto y otros datos de
        su persona que resulten esenciales para las finalidades, el buen
        funcionamiento y el constante mejoramiento de los Canales de Atención y
        de la SERVICLICK. Están comprendidos dentro de lo anteriormente
        señalado, el tratamiento conducente a aumentar el conocimiento de los
        clientes, para efectos de mejorar su experiencia de servicio o servicios
        que puedan ser contratados, así como para otorgarles ofertas,
        promociones, beneficios exclusivos que podrían consistir en ofertas en
        productos y servicios, por ejemplo, en convenios, concursos,
        descuentos,, así como en el ofrecimiento de productos o servicios
        farmacéuticos , seguros, asistencias, y, en general, cualquier otra
        cortesía o privilegio que se otorgue en consideración a la aceptación de
        los Términos y Condiciones, así como cualquier acción para recompensar
        la preferencia de éstos por SERVICLICK (en adelante también e
        indistintamente, los “Beneficios”). Estos Beneficios podrán ser tanto de
        carácter general, así como adaptados a las características personales de
        los Usuarios. En el tratamiento de estos datos, se incluyen todas las
        operaciones, según la definición establecida en la Ley. Asimismo, se
        deja constancia que el tratamiento de datos personales y únicamente
        supeditado para la realización de estudios u otros similares, puede
        incluir, con excepción de las sociedades relacionadas según se definen
        en el párrafo siguiente, la comunicación, transmisión o transferencia a
        terceros distintos a SERVICLICK de datos previamente anonimizados, lo
        que permite que estos datos no puedan identificar a una persona o
        hacerla identificable. Asimismo, se deja constancia que para el
        cumplimiento de los fines de respaldo y/o procesamiento, los datos
        personales y la demás información proporcionada por los Usuarios, podrá
        ser almacenada y/o procesada por terceros distintos al sistema comercial
        de SERVICLICK ubicado ya sea en Chile o en el extranjero.
      </p>
      <p>
        2.- Uso de Datos Personales. Los datos personales almacenados por el
        sistema comercial de SERVICLICK, podrán ser usados para uno o más de los
        siguientes fines: /i/ Comunicarle ofertas, información publicitaria y/o
        comercial, que puedan ser de su interés. Lo anterior incluye el envío
        y/o entrega, por cualquier vía, de todo tipo de información,
        formularios, encuestas, publicidad on-line y off-line, y en general
        promoción de productos y/o servicios de La Compañía y/o del Grupo MHM
        y/o sociedades relacionadas de acuerdo al artículo 100 de la Ley N°
        18.045., en adelante “sociedades relacionadas”. Sin perjuicio de lo
        anterior el Usuario podrá solicitar la suspensión del envío de las
        comunicaciones publicitarias o comerciales, de conformidad al artículo
        28 B de la ley 19.496; /ii/ Validar, confirmar y procesar las
        transacciones que los Usuarios realicen, /iii/ Prevenir fraudes que
        puedan ocasionar daños a los clientes o a SERVICLICK o a empresas que
        formen parte del Grupo MHM; y /iv/ efectuar el análisis de los datos
        entregados para efectos de aumentar el conocimiento de nuestros los
        clientes, y así mejorar su experiencia de compra, otorgarles ofertas,
        promociones y en general cualquier otro beneficio, de acuerdo a lo
        definido en los Términos y Condiciones. Asimismo, y para el logro de lo
        anterior, el sistema comercial de SERVICLICK también podrá elaborar
        estudios internos y externos sobre los intereses y comportamientos de
        los Usuarios de manera de comprender mejor sus necesidades e intereses y
        ofrecer más y mejores beneficios.
      </p>
      <p>
        3.- Recopilación de datos en poder de terceros y, o mediante fuentes
        accesibles al público. Durante el tiempo que el Usuario se mantenga
        utilizando los Canales de Atención, el sistema comercial de SERVICLICK
        podría complementar la información de sus Usuarios en base a datos que
        se obtengan debido al uso de los Canales de Atención, a información
        aportada por terceras personas o, mediante datos personales que
        provengan de fuentes accesibles al público. Respecto de dicha
        información el sistema comercial de SERVICLICK velará, a través los
        medios que tenga disponible, porque la información sea exacta,
        actualizada y que responda con veracidad a la situación real del titular
        de los datos, y serán manejados de acuerdo con lo dispuesto en la
        presente cláusula.
      </p>
      <p>
        4.- Cookies. Una cookie es un pequeño fragmento de información que un
        sitio web almacena en el archivo de cookies de su navegador y que
        permite que el sitio recuerde al Usuario. Las Cookies no pueden
        utilizarse para ejecutar programas o introducir virus en su computador.
        En el caso del Canal de Atención constituido por el sitio web,
        SERVICLICK utiliza cookies para identificar a los Usuarios que visitan
        el Sitio Web, recordar las preferencias de los Usuarios y proporcionar
        servicios personalizados, así como para hacer un seguimiento de la
        utilización del Sitio Web. Asimismo, el Sitio Web puede incluir cookies
        de terceros tales como empresas afiliadas, proveedores de servicios y/o
        contenidos.
      </p>
      <p>
        5.- Seguridad, Transmisión de datos, comunicación al público. El sistema
        comercial de SERVICLICK en virtud del contrato suscrito con MHM
        SERVICIOS SpA, se compromete a proteger y custodiar los datos personales
        de sus Usuarios con la debida diligencia. Los datos personales aportados
        por los Usuarios serán únicamente transmitidos al Grupo MHM y a las
        sociedades relacionadas de acuerdo al artículo 100 de la Ley N° 18.045 y
        para los objetos señalados en el presente instrumento. Si para el
        cumplimiento de los servicios se deban entregar ciertos datos a terceros
        que colaboran con la prestación de tales servicios, los datos entregados
        serán los estrictamente necesarios para la prestación de éstos. Respecto
        de todos estos terceros, SERVICLICK hará esfuerzos razonables para que
        dichos terceros se comprometan a proteger la privacidad de tales datos y
        a establecer los cuidados adecuados de los mismos tratando de mantener
        la integridad, seguridad y confidencialidad de la información personal
        que es compartida con ellos.
      </p>
      <p>
        6.- Tratamiento agregado de datos y entrega de información a la
        autoridad. Las restricciones establecidas en la presente cláusula no
        serán aplicables si los datos personales de los Usuarios deban, de
        acuerdo con la legislación vigente, ser puestos a disposición de la
        autoridad competente. Tampoco serán aplicables tales restricciones
        cuando la información sea tratada y, o utilizada de manera agregada, no
        siendo así posible la identificación de un determinado Usuario y siempre
        que dicha información sea tratada con objetivos estadísticos o de
        cualquier tipo de estudios, incluidos los de mercado y de productos, en
        los que no pueda establecerse la identidad de las personas cuyos datos
        son incluidos en dicho tratamiento.
      </p>
      <p>
        7.- Derechos de los Usuarios. De acuerdo a la Ley, todos los Usuarios
        tienen derecho, entre otros, a: Acceso: ser informados respecto del
        tratamiento de sus datos personales, ya sea sobre la información de los
        datos relativos a su persona, su procedencia y destinatario, el
        propósito del almacenamiento y la individualización de las personas a
        las cuales sus datos son transmitidos regularmente; Rectificación: que
        se modifiquen sus datos en caso que acredite que éstos sean erróneos,
        inexactos, equívocos o incompletos Cancelación: solicitar la eliminación
        de sus datos cuando éstos se encuentren caducos, carezcan de fundamento
        legal o si no desea continuar figurando en un registro de comunicaciones
        comerciales. Oposición: revocar, sin efecto retroactivo, la autorización
        para continuar con la utilización de sus datos personales, sin perjuicio
        que, debido a que éstos son esenciales para el Programa, podría
        traducirse en la exclusión del mismo. Para todos estos efectos se podrá
        dirigir una comunicación a info@serviclick.cl
      </p>
      <p>
        8.- Declaración del Usuario. Los Usuarios declaran ser mayores de edad
        al momento de la recolección de sus datos personales, y que los datos
        personales aportados por los Usuarios son correctos, fidedignos,
        actualizados y veraces. En consideración a lo anterior, los Usuarios se
        comprometen a notificar a SERVICLICK cualquier modificación de sus datos
        en cuanto sea esto posible. Así, los Usuarios se hacen responsables de
        cualquier perjuicio que el no cumplimiento de cualquiera de los
        elementos de la presente declaración genere a la SERVICLICK y/o el
        sistema comercial de SERVICLICK y/o al Grupo MHM y/o a sus empresas
        relacionadas de acuerdo al artículo 100 de la Ley N° 18.045.
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">SEXTO:</span> INTERPRETACIÓN Y
          MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES.
        </h2>
      </div>
      <p>
        SERVICLICK se reserva el derecho de interpretar los presentes Términos y
        Condiciones. SERVICLICK podrá introducir modificaciones a los presentes
        Términos y Condiciones, debiendo informarlo por medios que determine,
        incluyendo sitio web, redes sociales, correo electrónico, mensaje de
        texto (SMS), mensaje en el comprobante de pago, o medios de comunicación
        masiva, como prensa escrita, radio, entre otros, así como cualquier otro
        medio que la Compañía estime idóneo para dicho fin, con a lo menos 20
        días corridos de anticipación previo al a la fecha en que empiecen a
        regir los nuevos Términos y Condiciones.
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">
          <span className="font-bold">SEPTIMO:</span> OTRAS DISPOSICIONES.
        </h2>
        <p>
          Dudas y consultas. Toda presentación, duda, consulta o reclamo
          relacionado con los presentes Términos y Condiciones, debe ser
          presentado a través de los siguientes canales de atención: (i)
          Servicio de Atención al Cliente teléfono número 600 086 0580; o (ii) a
          la siguiente casilla de correo electrónico info@serviclick.cl
        </p>
        <p>
          Solución de conflictos. Cualquier dificultad o controversia que se
          suscite en relación con estos Términos y Condiciones podrá ser
          sometida a conocimiento del Juzgado De Policía Local competente de
          acuerdo con la ley 19.496 Sobre Protección de los Derechos de los
          Consumidores; sin perjuicio de la competencia de los Tribunales de
          Justicia correspondientes en otras materias.
        </p>
        <p>
          Domicilio y legislación aplicable. Los presentes Términos y
          Condiciones se rigen por la legislación chilena. La Compañía fija su
          domicilio en la ciudad y ciudad de Santiago
        </p>
      </div>
    </section>
  )
}
