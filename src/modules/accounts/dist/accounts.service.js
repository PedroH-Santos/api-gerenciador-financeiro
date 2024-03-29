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
exports.AccountsService = void 0;
var common_1 = require("@nestjs/common");
var AccountsService = /** @class */ (function () {
    function AccountsService(accountRepository) {
        this.accountRepository = accountRepository;
    }
    AccountsService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRepository.create(data)];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    AccountsService.prototype.edit = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var accountFind, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRepository.findOne(id)];
                    case 1:
                        accountFind = _a.sent();
                        if (!accountFind) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: 'Usuário não encontrado'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.accountRepository.edit(id, data)];
                    case 2:
                        account = _a.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    AccountsService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var accountFind, accountDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRepository.findOne(id)];
                    case 1:
                        accountFind = _a.sent();
                        if (!accountFind) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: 'Usuário não encontrado'
                            }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.accountRepository["delete"](id)];
                    case 2:
                        accountDeleted = _a.sent();
                        return [2 /*return*/, accountDeleted];
                }
            });
        });
    };
    AccountsService.prototype.filter = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRepository.filter(data)];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts];
                }
            });
        });
    };
    AccountsService.prototype.listAllByGroupId = function (groupId) {
        return __awaiter(this, void 0, Promise, function () {
            var accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountRepository.listByGroup(groupId)];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts];
                }
            });
        });
    };
    AccountsService = __decorate([
        common_1.Injectable()
    ], AccountsService);
    return AccountsService;
}());
exports.AccountsService = AccountsService;
