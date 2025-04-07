/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User sign up
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user@example.com
 *               dayOfBirth:
 *                 type: string
 *                 description: User's date of birth
 *                 example: 1990-01-01
 *               avatarUrl:
 *                 type: string
 *                 description: URL of the user's avatar
 *                 example: https://example.com/avatar.jpg
 *               gender:
 *                 type: string
 *                 description: User's gender
 *                 example: male
 *               role:
 *                 type: string
 *                 description: User's role (0 for admin, 1 for user)
 *                 example: 1
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the user's password
 *                 example: password123
 *               address:
 *                 type: string
 *                 description: User's address
 *                 example: 123 Main Street
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     token:
 *                       type: string
 *                       description: JWT token
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: Filter users by phone number 
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter users by role(1 for owner, 0 for freelancer)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /users/{id}/stores:
 *   get:
 *     summary: Get stores by owner id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get stores by id
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: store id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /stores/{id}:
 *   patch:
 *     summary: Update a store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the store
 *                 example: Updated Store Name
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the store
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 description: Email of the store
 *                 example: updated@example.com
 *               address:
 *                 type: string
 *                 description: Address of the store
 *                 example: 456 Another Street
 *     responses:
 *       200:
 *         description: Store updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 */
/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     owner_id:
 *                       type: string
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the store
 *                 example: My New Store
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the store
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 description: Email of the store
 *                 example: store@example.com
 *               address:
 *                 type: string
 *                 description: Address of the store
 *                 example: 123 Main Street
 *               owner_id:
 *                 type: string
 *                 description: ID of the store owner
 *                 example: 1
 *     responses:
 *       201:
 *         description: Store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     owner_id:
 *                       type: string
 */

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store deleted successfully
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
 *                   example: Record deleted successfully
 */