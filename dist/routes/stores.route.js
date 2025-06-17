"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stores_controller_1 = require("../controllers/stores.controller");
const router = (0, express_1.Router)();
router.get('/', stores_controller_1.getAllProducts);
router.get('/:id', stores_controller_1.getProduct);
router.post('/', stores_controller_1.createProduct);
router.put('/:id', stores_controller_1.updateProduct);
router.delete('/:id', stores_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=stores.route.js.map