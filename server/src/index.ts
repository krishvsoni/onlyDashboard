const express = require("express");
import { z, ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";

const app = require("express")();
const PORT = process.env.PORT || 5000;

app.use(express.json());
let users: any[] = [];
let stores: any[] = [];

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

const StoreSchema = z.object({
    name: z.string(),
    address: z.string(),
    type: z.string(),
});

function authenticateUser(req: any, res: any, next: any) {
    const { token } = req.headers as { token: string };
    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
}

function errorHandler(err: any, req: any, res: any, next: any) {
    if (err instanceof ZodError) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    next(err);
}

app.post("/register", (req: any, res: any) => {
    const { name, email, password } = UserSchema.parse(req.body);
    const token = uuidv4();
    const user = { name, email, password, token };
    users.push(user);
    res.status(201).json({ message: "User registered successfully", token });
});

app.post("/login", (req: any, res: any) => {
    const { email, password } = UserSchema.parse(req.body);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", token: user.token });
});

app.post("/stores", authenticateUser, (req: any, res: any) => {
    const { name, address, type } = StoreSchema.parse(req.body);
    const store = { name, address, type, ownerId: req.user.id };
    stores.push(store);
    res.status(201).json({ message: "Store created successfully", store });
});

app.get("/stores", authenticateUser, (req: any, res: any) => {
    const userStores = stores.filter(store => store.ownerId === req.user.id);
    res.status(200).json(userStores);
});

app.post("/stores/create", authenticateUser, (req: any, res: any) => {
    const { name, address, type } = StoreSchema.parse(req.body);
    const store = { name, address, type, ownerId: req.user.id };
    stores.push(store);
    res.status(201).json({ message: "Store created successfully", store });
});

app.put("/stores/:storeId", authenticateUser, (req: any, res: any) => {
    const storeId = req.params.storeId;
    const { name, address, type } = StoreSchema.parse(req.body);
    const storeIndex = stores.findIndex(store => store.ownerId === req.user.id && store.id === storeId);
    if (storeIndex === -1) {
        return res.status(404).json({ message: "Store not found" });
    }
    stores[storeIndex] = { id: storeId, name, address, type, ownerId: req.user.id };
    res.status(200).json({ message: "Store updated successfully", store: stores[storeIndex] });
});

app.delete("/stores/:storeId", authenticateUser, (req: any, res: any) => {
    const storeId = req.params.storeId;
    const storeIndex = stores.findIndex(store => store.ownerId === req.user.id && store.id === storeId);
    if (storeIndex === -1) {
        return res.status(404).json({ message: "Store not found" });
    }
    stores.splice(storeIndex, 1);
    res.status(200).json({ message: "Store deleted successfully" });
});


app.use(errorHandler); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
