/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __importDefault(__webpack_require__(1));
const express_1 = __importDefault(__webpack_require__(2));
const cors_1 = __importDefault(__webpack_require__(3));
const cookie_parser_1 = __importDefault(__webpack_require__(4));
const api_1 = __importDefault(__webpack_require__(5));
const swagger_ui_express_1 = __importDefault(__webpack_require__(20));
const swagger_json_1 = __importDefault(__webpack_require__(21));
// Initialize express
const app = (0, express_1.default)();
// Allow express to understand cookies (required for HttpOnly)
app.use((0, cookie_parser_1.default)());
// Middleware for JSON parsing
app.use(express_1.default.json());
// Cross Origin
app.use((0, cors_1.default)({
    origin: process.env.BASE_URL,
    credentials: true,
}));
// Set JSON formatting
app.set("json spaces", 2);
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Serve swagger api docs
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Start the server only if the database connection is successful
const PORT = process.env.PORT || 5000;
// Use routes
app.use(api_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(2));
const router = express_1.default.Router();
const authRoutes_1 = __importDefault(__webpack_require__(6));
const userRoutes_1 = __importDefault(__webpack_require__(15));
const testRoutes_1 = __importDefault(__webpack_require__(18));
router.use(authRoutes_1.default);
router.use(userRoutes_1.default);
router.use(testRoutes_1.default);
exports["default"] = router;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(2));
const authController = __importStar(__webpack_require__(7));
const router = express_1.default.Router();
router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);
router.post("/api/register", authController.register);
exports["default"] = router;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.register = exports.logout = exports.login = void 0;
// import prisma from '../prisma';
const jsonwebtoken_1 = __importDefault(__webpack_require__(8));
const utils_1 = __webpack_require__(9);
const client_1 = __webpack_require__(14);
// const secret = process.env.SECRET_KEY
const prisma = new client_1.PrismaClient();
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user && (await (0, utils_1.verifyPassword)(password, user.passwordHash))) {
            // Generate a JWT token
            // TODO
            // accessToken
            // refreshToken
            // SPAToken?
            const token = jsonwebtoken_1.default.sign({ username: user.email, userId: user.id }, "your_secret_key_goes_here", { expiresIn: "1h" });
            // Destructure user object and replace null values with empty strings
            const { firstName, lastName, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified, } = user || {};
            // Set default values for properties that might be null
            const userData = {
                firstName: firstName !== null && firstName !== void 0 ? firstName : "",
                lastName: lastName !== null && lastName !== void 0 ? lastName : "",
                email,
                phone: phone !== null && phone !== void 0 ? phone : "",
                profilePicture: profilePicture !== null && profilePicture !== void 0 ? profilePicture : "",
                locale: locale !== null && locale !== void 0 ? locale : "",
                country: country !== null && country !== void 0 ? country : "",
                permissions: permissions !== null && permissions !== void 0 ? permissions : [],
                subscription: subscription !== null && subscription !== void 0 ? subscription : "",
                dateCreated: dateCreated !== null && dateCreated !== void 0 ? dateCreated : "",
                lastModified: lastModified !== null && lastModified !== void 0 ? lastModified : "",
            };
            // Set JWT token as cookie and return user data
            return res
                .status(200)
                .cookie("JWT_TOKEN", `Bearer ${token}`, {
                secure: true,
                httpOnly: true,
                sameSite: "strict",
            })
                .json({ data: userData });
        }
        else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
// Logout
const logout = async (req, res) => {
    // Clear the JWT token cookie by setting it with an empty value and an expiration date in the past
    try {
        res.cookie("JWT_TOKEN", "", {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
        });
        return res.status(200).json({ data: null });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;
// SignUp
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the username is already taken
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already taken" });
        }
        // Create a hashed password
        const hashedPassword = await (0, utils_1.createHashedPassword)(password);
        // Save the user to the database
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
            },
        });
        // Get that user after creation
        const user = await prisma.user.findUnique({
            where: {
                email: newUser.email,
            },
        });
        console.log(newUser);
        // Destructure user object and replace null values with empty strings
        const { firstName, lastName, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified, } = user || {};
        // Set default values for properties that might be null
        const userData = {
            firstName: firstName !== null && firstName !== void 0 ? firstName : "",
            lastName: lastName !== null && lastName !== void 0 ? lastName : "",
            email,
            phone: phone !== null && phone !== void 0 ? phone : "",
            profilePicture: profilePicture !== null && profilePicture !== void 0 ? profilePicture : "",
            locale: locale !== null && locale !== void 0 ? locale : "",
            country: country !== null && country !== void 0 ? country : "",
            permissions: permissions !== null && permissions !== void 0 ? permissions : [],
            subscription: subscription !== null && subscription !== void 0 ? subscription : "",
            dateCreated: dateCreated !== null && dateCreated !== void 0 ? dateCreated : "",
            lastModified: lastModified !== null && lastModified !== void 0 ? lastModified : "",
        };
        // Generate a JWT token for the newly registered user
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, userId: newUser.id }, "your_secret_key_goes_here", { expiresIn: "1h" });
        // Set JWT token as cookie and return user data
        return res
            .status(200)
            .cookie("JWT_TOKEN", `Bearer ${token}`, {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        })
            .json({ data: userData });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.register = register;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(13), exports);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createHashedPassword = createHashedPassword;
const crypto_1 = __importDefault(__webpack_require__(11));
async function createHashedPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const iterations = 10000;
    const keyLength = 64; // 64 bytes for sha512
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(password, salt, iterations, keyLength, "sha512", (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            else {
                const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;
                resolve(hashedPassword);
            }
        });
    });
}


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyPassword = verifyPassword;
const crypto_1 = __importDefault(__webpack_require__(11));
async function verifyPassword(candidatePassword, storedPasswordHash) {
    const [salt, hash] = storedPasswordHash.split(":");
    const iterations = 10000;
    const keyLength = 64; // 64 bytes for sha512
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(candidatePassword, salt, iterations, keyLength, "sha512", (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash === derivedKey.toString("hex"));
            }
        });
    });
}


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(__webpack_require__(8));
const validateJWT = (req, res, next) => {
    const JWTCookie = req.cookies.JWT_TOKEN;
    const token = JWTCookie && JWTCookie.split(" ")[1];
    const SECRET_KEY = "your_secret_key_goes_here";
    if (token == null) {
        return res.sendStatus(401);
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        else {
            // Token is valid, attach decoded payload to request object
            // req.user = decoded;
            next();
        }
    });
};
exports.validateJWT = validateJWT;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(2));
const userController = __importStar(__webpack_require__(16));
const habitsController = __importStar(__webpack_require__(17));
const utils_1 = __webpack_require__(9);
const router = express_1.default.Router();
// Users
router.get("/api/user/:id", utils_1.validateJWT, userController.getUser);
router.get("/api/users", utils_1.validateJWT, userController.getAllUsers);
// Habits
router.get("/api/habits", utils_1.validateJWT, habitsController.getUserHabits);
exports["default"] = router;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllUsers = exports.getUser = void 0;
const client_1 = __webpack_require__(14);
const prisma = new client_1.PrismaClient();
// Get all users
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
            return;
        }
        // Everything except the password hash
        const { firstName, lastName, email, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified, } = user;
        const userData = {
            firstName: firstName !== null && firstName !== void 0 ? firstName : "",
            lastName: lastName !== null && lastName !== void 0 ? lastName : "",
            email,
            phone: phone !== null && phone !== void 0 ? phone : "",
            profilePicture: profilePicture !== null && profilePicture !== void 0 ? profilePicture : "",
            locale: locale !== null && locale !== void 0 ? locale : "",
            country: country !== null && country !== void 0 ? country : "",
            permissions: permissions !== null && permissions !== void 0 ? permissions : [],
            subscription: subscription !== null && subscription !== void 0 ? subscription : "",
            dateCreated: dateCreated !== null && dateCreated !== void 0 ? dateCreated : "",
            lastModified: lastModified !== null && lastModified !== void 0 ? lastModified : "",
        };
        res.status(200).json({
            data: {
                userData,
            },
        });
    }
    catch (err) {
        console.error(`Error fetching user with id ${id}:`, err);
        res.status(500).json({
            message: `An error occurred while fetching user with id ${id}`,
        });
    }
};
exports.getUser = getUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            data: {
                users,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while fetching users",
        });
    }
};
exports.getAllUsers = getAllUsers;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserHabits = void 0;
const getUserHabits = async (req, res) => {
    try {
        res.status(200).json({
            data: [
                {
                    _id: "5f50c31e1c4ae0b63c4b4a94",
                    user_id: "123456",
                    title: "Sleep",
                    slug: "/sleep",
                    description: "Lights out at 10pm",
                    color: "#7dd3fc",
                    bgcolor: "#3b82f6",
                    icon: undefined,
                    successIcon: "1f4a4",
                    errorIcon: "1f440",
                    created_at: "2023-09-08T12:34:56Z",
                    days: undefined,
                },
            ],
        });
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while fetching habits",
        });
    }
};
exports.getUserHabits = getUserHabits;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(2));
const testController = __importStar(__webpack_require__(19));
const router = express_1.default.Router();
router.get("/api/test/env", testController.testENV);
router.post("/api/test/somedata", testController.someData);
exports["default"] = router;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.someData = exports.testENV = void 0;
const client_1 = __webpack_require__(14);
const prisma = new client_1.PrismaClient();
const testENV = async (req, res) => {
    const BASE_URL = process.env.BASE_URL;
    try {
        res.status(200).json({
            data: {
                baseURL: BASE_URL,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while fetching habits",
        });
    }
};
exports.testENV = testENV;
const someData = async (req, res) => {
    try {
        const test = await prisma.test.create({
            data: {
                someData: "test",
            },
        });
        res.status(200).json({
            test,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while testing",
        });
    }
};
exports.someData = someData;


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("swagger-ui-express");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"swagger":"2.0","info":{"version":"1.0.0","title":"REST API","description":""},"host":"localhost:5000","basePath":"","tags":[{"name":"","description":""}],"schemes":[],"securityDefinitions":{},"paths":{"/api/login":{"post":{"description":"","parameters":[{"name":"body","in":"body","schema":{"type":"object","properties":{"email":{"example":"any"},"password":{"example":"any"}}}}],"responses":{"200":{"description":"OK"},"401":{"description":"Unauthorized"},"500":{"description":"Internal Server Error"}}}},"/api/logout":{"post":{"description":"","responses":{"200":{"description":"OK"},"500":{"description":"Internal Server Error"}}}},"/api/register":{"post":{"description":"","parameters":[{"name":"body","in":"body","schema":{"type":"object","properties":{"email":{"example":"any"},"password":{"example":"any"}}}}],"responses":{"200":{"description":"OK"},"400":{"description":"Bad Request"},"500":{"description":"Internal Server Error"}}}},"/api/user/{id}":{"get":{"description":"","parameters":[{"name":"id","in":"path","required":true,"type":"string"}],"responses":{"200":{"description":"OK"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"},"500":{"description":"Internal Server Error"}}}},"/api/users":{"get":{"description":"","responses":{"200":{"description":"OK"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"500":{"description":"Internal Server Error"}}}},"/api/habits":{"get":{"description":"","responses":{"200":{"description":"OK"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"500":{"description":"Internal Server Error"}}}},"/api/test/env":{"get":{"description":"","responses":{"200":{"description":"OK"},"500":{"description":"Internal Server Error"}}}},"/api/test/somedata":{"post":{"description":"","responses":{"200":{"description":"OK"},"500":{"description":"Internal Server Error"}}}},"/":{"get":{"description":"","responses":{"default":{"description":""}}}}}}');

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;