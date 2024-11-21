import { Router } from "express";
import * as insured from "../controllers/insured";

/**
 * @swagger
 * /insured/getByRut/{rut}:
 *   get:
 *     summary: Obtain insured by rut
 *     description: Returns the insured information and its associated products and beneficiaries.
 *     parameters:
 *       - $ref: '#/components/parameters/idHeader'
 *       - in: path
 *         name: rut
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer's RUT (99.999.999-X)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     insured:
 *                       description: "Información del asegurado titular"
 *                       type: object
 *                       properties:
 *                         rut:
 *                           type: string
 *                           example: "18.614.118-0"
 *                           description: "Rut del asegurado titular"
 *                         name:
 *                           type: string
 *                           example: "Enzzo Andres"
 *                           description: "Nombre del asegurado titular"
 *                         paternalLastname:
 *                           type: string
 *                           example: "Molina"
 *                           description: "Apellido paterno del asegurado titular"
 *                         maternalLastname:
 *                           type: string
 *                           example: "Fuentes"
 *                           description: "Apellido materno del asegurado titular"
 *                         address:
 *                           type: string
 *                           example: "Camino la Lecheria, 31"
 *                           description: "Dirección del asegurado titular"
 *                         district:
 *                           type: string
 *                           example: "Aysén"
 *                           description: "Comuna del asegurado titular"
 *                         email:
 *                           type: string
 *                           example: "clientes+186141180@serviclick.cl"
 *                           description: "Correo electrónico del asegurado titular"
 *                         phone:
 *                           type: string
 *                           example: "56954058545"
 *                           description: "Teléfono del asegurado titular"
 *                         birthdate:
 *                           type: string
 *                           example: "25/02/1994"
 *                           description: "Fecha de nacimiento del asegurado titular"
 *                     products:
 *                       type: array
 *                       description: "Información de los productos asociados al asegurado titular"
 *                       items:
 *                         type: object
 *                         properties:
 *                           broker:
 *                             type: object
 *                             description: "Información del corredor o intermediario"
 *                             properties:
 *                               rut:
 *                                 type: string
 *                                 example: "99.147.000-K"
 *                                 description: "Rut del corredor o intermediario"
 *                               name:
 *                                 type: string
 *                                 example: "BCI Seguros Generales S.A."
 *                                 description: "Nombre del corredor o intermediario"
 *                           customer:
 *                             description: "Información del cliente comprador del producto"
 *                             type: object
 *                             properties:
 *                               rut:
 *                                 type: string
 *                                 example: "18.614.118-0"
 *                                 description: "Rut del cliente comprador del producto"
 *                               name:
 *                                 type: string
 *                                 example: "Enzzo Andres"
 *                                 description: "Nombre del cliente comprador del producto"
 *                               paternalLastname:
 *                                 type: string
 *                                 example: "Molina"
 *                                 description: "Apellido paterno del cliente comprador del producto"
 *                               maternalLastname:
 *                                 type: string
 *                                 example: "Fuentes"
 *                                 description: "Apellido materno del cliente comprador del producto"
 *                               address:
 *                                 type: string
 *                                 example: "Chile"
 *                                 description: "Dirección del cliente comprador del producto"
 *                               district:
 *                                 type: string
 *                                 example: "Aysén"
 *                                 description: "Comuna del cliente comprador del producto"
 *                               email:
 *                                 type: string
 *                                 example: "clientes+186141180@serviclick.cl"
 *                                 description: "Correo electrónico del cliente comprador del producto"
 *                               phone:
 *                                 type: string
 *                                 example: "56954058545"
 *                                 description: "Teléfono del cliente comprador del producto"
 *                           product:
 *                             description: "Información del producto"
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Asistencia Salud Universal Familiar"
 *                                 description: "Nombre del producto"
 *                               description:
 *                                 type: string
 *                                 example: "Diseñamos un plan para que tú y tu familia puedan usar en cualquier clínica."
 *                                 description: "Descripción del producto"
 *                               price:
 *                                 type: number
 *                                 example: 5800
 *                                 description: "Precio del producto"
 *                               currency:
 *                                 type: string
 *                                 example: "P"
 *                                 description: "Moneda del precio del producto (P: Pesos, U: UF)"
 *                               frequency:
 *                                 type: string
 *                                 example: "M"
 *                                 description: "Frecuencia de pago del producto (M: Mensual, A: Anual)"
 *                               properties:
 *                                 type: array
 *                                 description: "Propiedades y valores de la materia, bien o mascota asegurada"
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     name:
 *                                       type: string
 *                                       example: "Nombre de la mascota"
 *                                       description: "Nombre del campo la materia, bien o mascota asegurada"
 *                                     value:
 *                                       type: string
 *                                       example: "Bobby"
 *                                       description: "Valor de la materia, bien o mascota asegurada"
 *                               assistances:
 *                                 type: array
 *                                 description: "Información de las asistencias asociadas al producto"
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     name:
 *                                       type: string
 *                                       example: "Telemedicina"
 *                                       description: "Nombre de la asistencia asociada al producto"
 *                                     description:
 *                                       type: string
 *                                       example: "El beneficiario podrá solicitar la coordinación de una hora de Telemedicina."
 *                                       description: "Descripción de la asistencia asociada al producto"
 *                                     limit:
 *                                       type: string
 *                                       example: "100% hasta UF 2"
 *                                       description: "Límite de cobertura de la asistencia asociada al producto"
 *                                     events:
 *                                       type: integer
 *                                       example: 3
 *                                       description: "Cantidad de eventos permitidos en el año para la asistencia asociada al producto"
 *                                     lack:
 *                                       type: integer
 *                                       example: 25
 *                                       description: "Días de carencia de la asistencia asociada al producto"
 *                                     used:
 *                                       description: "Información de uso de la asistencia asociada al producto"
 *                                       type: object
 *                                       properties:
 *                                         events:
 *                                           type: integer
 *                                           example: 4
 *                                           description: "Cantidad de eventos utilizados en el año para la asistencia asociada al producto"
 *                                         refund:
 *                                           type: integer
 *                                           nullable: true
 *                                           example: 0
 *                                           description: "Total reembolsado para la asistencia asociada al producto"
 *                                         imed:
 *                                           type: integer
 *                                           nullable: true
 *                                           example: 0
 *                                           description: "Total imputado a IMED para la asistencia asociada al producto"
 *                               beneficiaries:
 *                                 type: array
 *                                 nullable: true
 *                                 description: "Información de los beneficiarios asociados al producto"
 *                                 items:
 *                                   description: "Información de los beneficiarios asociados al producto"
 *                                   type: object
 *                                   properties:
 *                                     rut:
 *                                       type: string
 *                                       example: "27.245.685-2"
 *                                       description: "Rut de la carga asociada al titular"
 *                                     name:
 *                                       type: string
 *                                       example: "Florencia Isidora"
 *                                       description: "Nombre de la carga asociada al titular"
 *                                     paternalLastname:
 *                                       type: string
 *                                       example: "Molina"
 *                                       description: "Apellido paterno de la carga asociada al titular"
 *                                     maternalLastname:
 *                                       type: string
 *                                       example: "Marquez"
 *                                       description: "Apellido materno de la carga asociada al titular"
 *                                     address:
 *                                       type: string
 *                                       example: "Camino La Lecheria 31"
 *                                       description: "Dirección de la carga asociada al titular"
 *                                     district:
 *                                       type: string
 *                                       example: "Pirque"
 *                                       description: "Comuna de la carga asociada al titular"
 *                                     email:
 *                                       type: string
 *                                       example: "enzzo@serviclick.cl"
 *                                       description: "Correo electrónico de la carga asociada al titular"
 *                                     phone:
 *                                       type: string
 *                                       example: "954058545"
 *                                       description: "Teléfono de la carga asociada al titular"
 *                                     birthdate:
 *                                       type: string
 *                                       example: "21/03/2020"
 *                                       description: "Fecha de nacimiento de la carga asociada al titular"
 *                                     relationship:
 *                                       type: string
 *                                       nullable: true
 *                                       example: null
 *                                       description: "Parentesco de la carga con el titular"
 *                               collect:
 *                                 description: "Información de cobranza del producto"
 *                                 type: object
 *                                 properties:
 *                                   feeValue:
 *                                     type: number
 *                                     nullable: true
 *                                     example: 5800
 *                                     description: "Valor de la cuota del producto"
 *                                   freeMonths:
 *                                     type: integer
 *                                     nullable: true
 *                                     example: 0
 *                                     description: "Cantidad de meses de gracia del producto"
 *                                   feesCharged:
 *                                     type: integer
 *                                     nullable: true
 *                                     example: 10
 *                                     description: "Cantidad de cuotas cobradas del producto"
 *                                   charged:
 *                                     type: number
 *                                     nullable: true
 *                                     example: 58000
 *                                     description: "Total cobrado del producto"
 *                                   paid:
 *                                     type: number
 *                                     nullable: true
 *                                     example: 127600
 *                                     description: "Total pagado del producto"
 *                                   balance:
 *                                     type: number
 *                                     example: 0
 *                                     description: "Saldo del producto"
 *                               policy:
 *                                 description: "Información de póliza del producto"
 *                                 type: object
 *                                 properties:
 *                                   buy:
 *                                     type: string
 *                                     example: "13/02/2023"
 *                                     description: "Fecha de compra del producto"
 *                                   init:
 *                                     type: string
 *                                     example: "10/03/2023"
 *                                     description: "Fecha de inicio de vigencia del producto"
 *                                   end:
 *                                     type: string
 *                                     nullable: true
 *                                     example: null
 *                                     description: "Fecha de término de vigencia del producto"
 *                                   number:
 *                                     type: integer
 *                                     example: 29
 *                                     description: "Número de póliza del producto"
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Invalid token
 *       404:
 *         description: Customer not found
 */

const insuredRoutes = Router();
insuredRoutes.get("/getByRut/:rut", insured.getByRut);

export default insuredRoutes;
