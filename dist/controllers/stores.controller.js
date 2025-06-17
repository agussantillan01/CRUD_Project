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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const validateProductData = (data) => {
    const { name, address, cost } = data;
    if (!name || !address || cost === undefined) {
        return false;
    }
    return true;
};
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `Producto con id ${req.params.id} no encontrado` });
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateProductData(req.body)) {
        return res.status(400).json({ message: "Datos incompletos" });
    }
    try {
        const { name, address, cost } = req.body;
        const newProduct = yield product_1.default.create({ name, address, cost });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateProductData(req.body)) {
        return res.status(400).json({ message: "Datos incompletos" });
    }
    try {
        const product = yield product_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `Producto con id ${req.params.id} no encontrado` });
        }
        const { name, address, cost } = req.body;
        yield product.update({ name, address, cost });
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `Producto con id ${req.params.id} no encontrado` });
        }
        yield product.destroy();
        res.json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=stores.controller.js.map