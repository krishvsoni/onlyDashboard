"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user1 = yield prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                },
            });
            const user2 = yield prisma.user.create({
                data: {
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    password: 'password456',
                },
            });
            console.log('Users added:', user1, user2);
            const store1 = yield prisma.store.create({
                data: {
                    name: 'Store A',
                    address: '123 Main St',
                    type: 'Grocery',
                    ownerId: user1.id,
                },
            });
            const store2 = yield prisma.store.create({
                data: {
                    name: 'Store B',
                    address: '456 Elm St',
                    type: 'Clothing',
                    ownerId: user2.id,
                },
            });
            console.log('Stores added:', store1, store2);
        }
        catch (error) {
            console.error('Error adding data:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
addData();
exports.default = prisma;
