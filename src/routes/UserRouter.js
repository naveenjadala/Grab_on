/**
 * @swagger
 * /api/user/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Authentication failed
 *       401:
 *         description: Failed to authenticate token
 * 
 * /api/user/getUserById/{userId}:
 *  get:
 *    summary: Get user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *         description: Successful response
 *        
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: user logged in successfully
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *       400:
 *         description: Failed to login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: failed to login
 *       401:
 *         description: Authentication Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication Failed
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: user not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *                   example: Any internal error details
 *            
 */

const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  logout,
  getUserById,
  getAllUserData,
} = require("../controllers/UserContorller");
const { verifyToken } = require("../utils/AuthenticationCheck");
const { userSchema } = require("../validators/userValidator");
const { validateAuthInput } = require("../middlewares/authMiddleware");

router.post("/register", validateAuthInput(userSchema), createUser);
router.get("/getUserById/:userId", getUserById);
router.get("/getUsers", verifyToken, getAllUserData);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
