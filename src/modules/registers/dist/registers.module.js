"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistersModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("src/database/service/prisma.service");
var registers_controller_1 = require("./registers.controller");
var registers_repository_1 = require("./registers.repository");
var registers_service_1 = require("./registers.service");
var RegistersModule = /** @class */ (function () {
    function RegistersModule() {
    }
    RegistersModule = __decorate([
        common_1.Module({
            controllers: [registers_controller_1.RegisterController],
            providers: [registers_repository_1.RegistersRepository, registers_service_1.RegistersService, prisma_service_1.PrismaService],
            exports: [registers_repository_1.RegistersRepository, registers_service_1.RegistersService]
        })
    ], RegistersModule);
    return RegistersModule;
}());
exports.RegistersModule = RegistersModule;
