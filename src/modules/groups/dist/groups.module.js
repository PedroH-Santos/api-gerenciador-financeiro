"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupsModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("src/database/service/prisma.service");
var groups_controller_1 = require("./groups.controller");
var groups_repository_1 = require("./groups.repository");
var groupsMembers_module_1 = require("../groupsMembers/groupsMembers.module");
var groups_service_1 = require("./groups.service");
var GroupsModule = /** @class */ (function () {
    function GroupsModule() {
    }
    GroupsModule = __decorate([
        common_1.Module({
            controllers: [groups_controller_1.GroupController],
            providers: [groups_repository_1.GroupRepository, groups_service_1.GroupsService, prisma_service_1.PrismaService],
            exports: [groups_repository_1.GroupRepository],
            imports: [common_1.forwardRef(function () { return groupsMembers_module_1.GroupsMembersModule; })]
        })
    ], GroupsModule);
    return GroupsModule;
}());
exports.GroupsModule = GroupsModule;
