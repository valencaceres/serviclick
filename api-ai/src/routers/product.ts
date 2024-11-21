import { Router } from "express";
import * as product from "../controllers/product";

/**
 * @swagger
 * /product/getByRut/{rut}:
 *   get:
 *     summary: Obtain customer products
 *     description: Returns the customer information and its associated products.
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
 *         description: Customer products obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     rut:
 *                       type: string
 *                     name:
 *                       type: string
 *                     paternalLastname:
 *                       type: string
 *                     maternalLastname:
 *                       type: string
 *                     address:
 *                       type: string
 *                     district:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           dates:
 *                             type: object
 *                             properties:
 *                               buy:
 *                                 type: string
 *                               init:
 *                                 type: string
 *                             required:
 *                               - buy
 *                               - init
 *                           insured:
 *                             type: object
 *                             properties:
 *                               rut:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               paternalLastname:
 *                                 type: string
 *                               maternalLastname:
 *                                 type: string
 *                               address:
 *                                 type: string
 *                               district:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               phone:
 *                                 type: string
 *                               birthdate:
 *                                 type: string
 *                             required:
 *                               - rut
 *                               - name
 *                               - paternalLastname
 *                               - maternalLastname
 *                               - address
 *                               - district
 *                               - email
 *                               - phone
 *                               - birthdate
 *                           product:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               frequency:
 *                                 type: string
 *                               price:
 *                                 type: integer
 *                             required:
 *                               - name
 *                               - frequency
 *                               - price
 *                           beneficiaries:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 rut:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 paternalLastname:
 *                                   type: string
 *                                 maternalLastname:
 *                                   type: string
 *                                 address:
 *                                   type: string
 *                                 district:
 *                                   type: string
 *                                 email:
 *                                   type: string
 *                                 phone:
 *                                   type: string
 *                                 birthdate:
 *                                   type: string
 *                                 relationship:
 *                                   type: string
 *                               required:
 *                                 - rut
 *                                 - name
 *                                 - paternalLastname
 *                                 - maternalLastname
 *                                 - address
 *                                 - district
 *                                 - email
 *                                 - phone
 *                                 - birthdate
 *                                 - relationship
 *                 error:
 *                   type: string
 *                   nullable: true
 *       401:
 *         description: Invalid token
 *       404:
 *         description: Customer not found
 */

const productRoutes = Router();
productRoutes.get("/getByRut/:rut", product.getByRut);

export default productRoutes;
