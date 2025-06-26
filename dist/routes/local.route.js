"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const local_controller_1 = require("../controllers/local.controller");
const router = (0, express_1.Router)();
router.get("/", local_controller_1.getAllLocal);
router.get("/:id", local_controller_1.getLocal);
router.post("/", local_controller_1.createLocal);
router.put("/:id", local_controller_1.updateLocal);
router.delete("/:id", local_controller_1.deleteLocal);
exports.default = router;
//# sourceMappingURL=local.route.js.map