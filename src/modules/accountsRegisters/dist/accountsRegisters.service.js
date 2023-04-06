"use strict";
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
exports.AccountsRegistersService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var AccountsRegistersService = /** @class */ (function () {
    function AccountsRegistersService(accountRegistersRepository, accountsService) {
        this.accountRegistersRepository = accountRegistersRepository;
        this.accountsService = accountsService;
    }
    AccountsRegistersService.prototype.create = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, accounts, accountsRegisters;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { groupId: groupId };
                        return [4 /*yield*/, this.accountsService.filter(filter)];
                    case 1:
                        accounts = _a.sent();
                        return [4 /*yield*/, this.accountRegistersRepository.getRegistersByMonth(groupId)];
                    case 2:
                        accountsRegisters = _a.sent();
                        accounts.forEach(function (account) {
                            var findRegisterInMonth = accountsRegisters.find(function (register) { return register.accountId == account.id; });
                            if (!findRegisterInMonth) {
                                var dueDateNow = new Date((new Date().getMonth() + 1) + '/' + account.dayDueDate + "/" + new Date().getFullYear()).toISOString();
                                var newRegister = {
                                    accountId: account.id,
                                    dueDate: dueDateNow,
                                    price: account.priceInstallments,
                                    installments: account.installments
                                };
                                _this.accountRegistersRepository.create(newRegister);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountsRegistersService.prototype.updateStatus = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, accounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { groupId: groupId };
                        return [4 /*yield*/, this.accountsService.filter(filter)];
                    case 1:
                        accounts = _a.sent();
                        accounts.forEach(function (account) { return __awaiter(_this, void 0, void 0, function () {
                            var filterRegisterNotPayed, filterRegisterPayed, accountsRegisterNotPayed, accountsRegisterPayed, editAccount;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filterRegisterNotPayed = {
                                            accountId: account.id,
                                            status: [client_1.StatusAccount.LATED, client_1.StatusAccount.PENDING]
                                        };
                                        filterRegisterPayed = {
                                            accountId: account.id,
                                            status: [client_1.StatusAccount.PAYED]
                                        };
                                        return [4 /*yield*/, this.accountRegistersRepository.filter(filterRegisterNotPayed)];
                                    case 1:
                                        accountsRegisterNotPayed = _a.sent();
                                        return [4 /*yield*/, this.accountRegistersRepository.filter(filterRegisterPayed)];
                                    case 2:
                                        accountsRegisterPayed = _a.sent();
                                        accountsRegisterNotPayed.forEach(function (register) { return __awaiter(_this, void 0, void 0, function () {
                                            var editRegister;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(new Date() > register.dueDate)) return [3 /*break*/, 2];
                                                        editRegister = {
                                                            status: client_1.StatusAccount.LATED
                                                        };
                                                        return [4 /*yield*/, this.edit(register.id, editRegister)];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        if (!(accountsRegisterPayed.length == account.installments)) return [3 /*break*/, 4];
                                        editAccount = {
                                            status: client_1.StatusAccount.PAYED
                                        };
                                        return [4 /*yield*/, this.accountsService.edit(account.id, editAccount)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountsRegistersService.prototype.edit = function (registerId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var accountRegisterFind, register;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRegistersRepository.findOne(registerId)];
                    case 1:
                        accountRegisterFind = _a.sent();
                        if (!accountRegisterFind) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: 'Registro de conta não encontrado'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.accountRegistersRepository.edit(registerId, data)];
                    case 2:
                        register = _a.sent();
                        return [2 /*return*/, register];
                }
            });
        });
    };
    AccountsRegistersService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var accountRegisterFind;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRegistersRepository.findOne(id)];
                    case 1:
                        accountRegisterFind = _a.sent();
                        if (!accountRegisterFind) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: 'Registro de conta não encontrado'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.accountRegistersRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountsRegistersService.prototype.listAllByGroupId = function (groupId) {
        return __awaiter(this, void 0, Promise, function () {
            var registers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRegistersRepository.listByGroup(groupId)];
                    case 1:
                        registers = _a.sent();
                        return [2 /*return*/, registers];
                }
            });
        });
    };
    AccountsRegistersService = __decorate([
        common_1.Injectable()
    ], AccountsRegistersService);
    return AccountsRegistersService;
}());
exports.AccountsRegistersService = AccountsRegistersService;
