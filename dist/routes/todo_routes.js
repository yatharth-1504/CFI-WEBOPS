"use strict";
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
var db = require("../models");
var authJWT = require("../middlewares/auth_jwt");
var verifyToken = authJWT.verifyToken;
var User = db.user;
var content;
var addtodo;
var updatetodo;
var deletetodo;
content = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, res.send(user.todos)];
                else
                    res.send("user not found");
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.send({ message: e_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
addtodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, t, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                user = _a.sent();
                if (user) {
                    t = req.body.task.toString();
                    if (!user.todos.includes(req.body.task)) {
                        user.todos.push(t);
                        user.save(function (err) {
                            if (err) {
                                //console.log("HI");
                                return res.send({ message: err });
                            }
                            return res.send('Added a task to Todo list');
                        });
                    }
                    else {
                        return [2 /*return*/, res.send("Task previously exists")];
                    }
                }
                else {
                    res.send("User not found");
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                //console.log("HI");
                return [2 /*return*/, res.send({ message: e_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
updatetodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, i, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                user = _a.sent();
                if (user) {
                    if (user.todos.length > 0) {
                        for (i = 0; i < user.todos.length; i++) {
                            if (user.todos[i] === req.body.tobeupdated.toString()) {
                                user.todos[i] = req.body.newtodo.toString();
                                user.save(function (err) {
                                    if (err) {
                                        return res.send({ message: err });
                                    }
                                });
                                res.send("Updated TODO");
                            }
                        }
                        res.send("Requested task not found");
                    }
                    else {
                        return [2 /*return*/, res.send("NO tasks")];
                    }
                }
                else {
                    res.send("User not found");
                }
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.send({ message: e_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
deletetodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, i, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                user = _a.sent();
                if (user) {
                    for (i = 0; i < user.todos.length; i++)
                        if (user.todos[i] === req.body.task.toString()) {
                            user.todos.splice(i, 1);
                            user.save(function (err) {
                                if (err)
                                    res.send({ message: err });
                            });
                            res.send("DELETED SUCCESFULLY");
                        }
                    res.send("Task not found");
                }
                else
                    res.send("Requested user not found");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send({ message: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next(); // this function is bassically for invoking the next middleware 
    });
    app.post("/api/auth/signin/addtodo", verifyToken, addtodo);
    app.post("/api/auth/signin/updatetodo", verifyToken, updatetodo);
    app.post("/api/auth/signin/deletetodo", verifyToken, deletetodo);
    app.post("/api/auth/signin/todolist", verifyToken, content);
};
