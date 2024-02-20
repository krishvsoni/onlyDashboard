"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const app = require("express")();
const PORT = process.env.PORT || 3000;
//  app.use(express.json());
let users = [];
let stores = [];
const UserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const StoreSchema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    type: zod_1.z.string(),
});
function authenticateUser(req, res, next) {
    const { token } = req.headers;
    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
}
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    next(err);
}
app.post("/register", (req, res) => {
    const { name, email, password } = UserSchema.parse(req.body);
    const token = (0, uuid_1.v4)();
    const user = { name, email, password, token };
    users.push(user);
    res.status(201).json({ message: "User registered successfully", token });
});
app.post("/login", (req, res) => {
    const { email, password } = UserSchema.parse(req.body);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", token: user.token });
});
app.post("/stores", authenticateUser, (req, res) => {
    const { name, address, type } = StoreSchema.parse(req.body);
    const store = { name, address, type, ownerId: req.user.id };
    stores.push(store);
    res.status(201).json({ message: "Store created successfully", store });
});
app.get("/stores", authenticateUser, (req, res) => {
    const userStores = stores.filter(store => store.ownerId === req.user.id);
    res.status(200).json(userStores);
});
app.use(errorHandler); // Handle all errors
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
