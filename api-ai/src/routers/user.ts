import { Router } from "express";
import * as user from "../controllers/user";

/**
 * @swagger
 * /user/validate:
 *   post:
 *     summary: Validate user login and password
 *     description: Validates the user login and password, returning a token if the credentials are correct.
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: API Key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: "usuario@example.com"
 *                 description: User's login
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User validated successfully, returning the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: User's token
 *                 error:
 *                   type: string
 *                   example: null
 *                   description: Error message
 *       400:
 *         description: Credentials are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "Credentials are invalid"
 */

const userRoutes = Router();
userRoutes.post("/upsert", user.upsert);
userRoutes.put("/updatePassword", user.updatePassword);
userRoutes.post("/validate", user.validate);

export default userRoutes;
