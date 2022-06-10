"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenEmail = () => Date.now().toString(32) + Math.random().toString(32).substring(2);
exports.default = tokenEmail;
