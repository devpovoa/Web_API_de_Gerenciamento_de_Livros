const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     description: Obtém todos os usuários do sistema.
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: João Silva
 */
router.get('/api/users', (req, res) => {
 res.json([{ id: 1, nome: 'João Silva' }]);
});

module.exports = router;
