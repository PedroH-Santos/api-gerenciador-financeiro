"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AccountRegistersRepository = void 0;
var common_1 = require("@nestjs/common");
var AccountRegistersRepository = /** @class */ (function () {
    function AccountRegistersRepository(prismaService) {
        this.prismaService = prismaService;
    }
    AccountRegistersRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var accountRegisterCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.create({
                            data: {
                                dueDate: data.dueDate,
                                price: data.price,
                                accountId: data.accountId
                            }
                        })];
                    case 1:
                        accountRegisterCreated = _a.sent();
                        return [2 /*return*/, accountRegisterCreated];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.listAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.findMany()];
                    case 1:
                        accountsRegister = _a.sent();
                        return [2 /*return*/, accountsRegister];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.listByGroup = function (groupId) {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.findMany({
                            include: {
                                accounts: true
                            },
                            where: {
                                accounts: {
                                    group: {
                                        id: groupId
                                    }
                                }
                            }
                        })];
                    case 1:
                        accountsRegister = _a.sent();
                        return [2 /*return*/, accountsRegister];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.findFirst({
                            where: { id: id }
                        })];
                    case 1:
                        accountsRegister = _a.sent();
                        return [2 /*return*/, accountsRegister];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.edit = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.update({
                            data: data,
                            where: { id: id }
                        })];
                    case 1:
                        accountsRegister = _a.sent();
                        return [2 /*return*/, accountsRegister];
                }
            });
        });
    };
    AccountRegistersRepository.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters["delete"]({
                            where: { id: id }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.filter = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.accountsRegisters.findMany({
                            where: {
                                dueDate: {
                                    equals: data.dueDate
                                },
                                status: {
                                    "in": data.status
                                },
                                accountId: {
                                    equals: data.accountId
                                }
                            }
                        })];
                    case 1:
                        accountsRegister = _a.sent();
                        return [2 /*return*/, accountsRegister];
                }
            });
        });
    };
    AccountRegistersRepository.prototype.getRegistersByMonth = function (groupId) {
        return __awaiter(this, void 0, Promise, function () {
            var accountsRegisters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT * FROM \"accountsRegisters\" ar  \n        JOIN accounts ac on ac.id = ar.\"accountId\"\n        WHERE ac.\"groupId\" = ", " AND\n        date_part('month',ar.\"createdAt\") =  date_part('month', (SELECT current_timestamp))"], ["\n        SELECT * FROM \"accountsRegisters\" ar  \n        JOIN accounts ac on ac.id = ar.\"accountId\"\n        WHERE ac.\"groupId\" = ", " AND\n        date_part('month',ar.\"createdAt\") =  date_part('month', (SELECT current_timestamp))"])), groupId)];
                    case 1:
                        accountsRegisters = _a.sent();
                        return [2 /*return*/, accountsRegisters];
                }
            });
        });
    };
    AccountRegistersRepository = __decorate([
        common_1.Injectable()
    ], AccountRegistersRepository);
    return AccountRegistersRepository;
}());
exports.AccountRegistersRepository = AccountRegistersRepository;
var templateObject_1;
