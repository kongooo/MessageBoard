"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
const temp_path = path_1.default.join(__dirname, '../../dist');
const main = koa_static_1.default(temp_path);
const home = new koa_router_1.default();
home.get('/', async (ctx) => {
});
app.use(main)
    .use(koa_bodyparser_1.default())
    .use(home.routes())
    .use(home.allowedMethods());
app.listen(3000);
//# sourceMappingURL=server.js.map