"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var registers_module_1 = require("./modules/registers/registers.module");
var users_module_1 = require("./modules/users/users.module");
var accounts_module_1 = require("./modules/accounts/accounts.module");
var groups_module_1 = require("./modules/groups/groups.module");
var authenticate_module_1 = require("./modules/authenticate/authenticate.module");
var groupsMembers_module_1 = require("./modules/groupsMembers/groupsMembers.module");
var accountsRegisters_module_1 = require("./modules/accountsRegisters/accountsRegisters.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [users_module_1.UsersModule, registers_module_1.RegistersModule, accounts_module_1.AccountsModule, groups_module_1.GroupsModule, authenticate_module_1.AuthenticateModule, groupsMembers_module_1.GroupsMembersModule, accountsRegisters_module_1.AccountsRegistersModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
