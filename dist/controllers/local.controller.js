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
exports.deleteLocal = exports.updateLocal = exports.createLocal = exports.getLocal = exports.getAllLocal = void 0;
const Local_1 = __importDefault(require("../models/Local"));
//#region validations
const validateLocalData = (data) => {
    const { name, address, cost } = data;
    if (!name || !address || cost === undefined) {
        return false;
    }
    return true;
};
//#endregion
//#region  CRUD
//#region GetAll
const getAllLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("DESDE GET ALL");
        const Locals = yield Local_1.default.findAll();
        res.json(Locals);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error` });
    }
});
exports.getAllLocal = getAllLocal;
//#endregion
//#region  GetXid
const getLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const local = yield Local_1.default.findByPk(req.params.id);
        if (!local) {
            return res.status(404).json({ message: `Local con id ${req.params.id} no encontrado` });
        }
        res.json(local);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal server error` });
    }
});
exports.getLocal = getLocal;
//#endregion
//#region create 
const createLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateLocalData(req.body)) {
        return res.status(400).json({ message: `Incomplete data` });
    }
    try {
        const { name, address, cost } = req.body;
        const newLocal = yield Local_1.default.create({ name, address, cost });
        res.status(201).json(newLocal);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal server error` });
    }
});
exports.createLocal = createLocal;
//#endregion
//#region update
const updateLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateLocalData(req.body)) {
        return res.status(400).json({ message: `Incomplete data` });
    }
    try {
        const local = yield Local_1.default.findByPk(req.params.id);
        if (!local) {
            return res.status(404).json({ message: `Local with id ${req.params.id} not found` });
        }
        const { name, address, cost } = req.body;
        yield local.update({ name, address, cost });
        res.json(local);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error` });
    }
});
exports.updateLocal = updateLocal;
//#endregion
//#region  delete
const deleteLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const local = yield Local_1.default.findByPk(req.params.id);
        if (!local) {
            return res.status(404).json({ message: `Local with id ${req.params.id} not found` });
        }
        yield local.destroy();
        res.json({ message: `Local deleted correctly` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error` });
    }
});
exports.deleteLocal = deleteLocal;
//#endregion
//#endregion
//# sourceMappingURL=local.controller.js.map