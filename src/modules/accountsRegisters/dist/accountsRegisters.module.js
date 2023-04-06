"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountsRegistersModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("src/database/service/prisma.service");
var accountsRegisters_controller_1 = require("./accountsRegisters.controller");
var accountsRegisters_repository_1 = require("./accountsRegisters.repository");
var accountsRegisters_service_1 = require("./accountsRegisters.service");
var groupsMembers_module_1 = require("../groupsMembers/groupsMembers.module");
var groups_module_1 = require("../groups/groups.module");
var accounts_module_1 = require("../accounts/accounts.module");
var AccountsRegistersModule = /** @class */ (function () {
    function AccountsRegistersModule() {
    }
    AccountsRegistersModule = __decorate([
        common_1.Module({
            controllers: [accountsRegisters_controller_1.AccountsRegistersController],
            providers: [accountsRegisters_repository_1.AccountRegistersRepository, accountsRegisters_service_1.AccountsRegistersService, prisma_service_1.PrismaService],
            exports: [accountsRegisters_repository_1.AccountRegistersRepository, accountsRegisters_service_1.AccountsRegistersService],
            imports: [accounts_module_1.AccountsModule, groups_module_1.GroupsModule, groupsMembers_module_1.GroupsMembersModule]
        })
    ], AccountsRegistersModule);
    return AccountsRegistersModule;
}());
exports.AccountsRegistersModule = AccountsRegistersModule;
