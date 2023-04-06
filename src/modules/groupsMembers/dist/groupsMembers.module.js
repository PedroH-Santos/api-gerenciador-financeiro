"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupsMembersModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("src/database/service/prisma.service");
var groupsMembers_repository_1 = require("./groupsMembers.repository");
var groupsMembers_controller_1 = require("./groupsMembers.controller");
var groups_module_1 = require("../groups/groups.module");
var groupsMembers_service_1 = require("./groupsMembers.service");
var GroupsMembersModule = /** @class */ (function () {
    function GroupsMembersModule() {
    }
    GroupsMembersModule = __decorate([
        common_1.Module({
            controllers: [groupsMembers_controller_1.GroupsMembersController],
            providers: [groupsMembers_repository_1.GroupsMembersRepository, groupsMembers_service_1.GroupsMembersService, prisma_service_1.PrismaService],
            exports: [groupsMembers_repository_1.GroupsMembersRepository, groupsMembers_service_1.GroupsMembersService],
            imports: [common_1.forwardRef(function () { return groups_module_1.GroupsModule; })]
        })
    ], GroupsMembersModule);
    return GroupsMembersModule;
}());
exports.GroupsMembersModule = GroupsMembersModule;
