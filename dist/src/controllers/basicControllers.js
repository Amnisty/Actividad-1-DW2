"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRegister = exports.getFormController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getFormController = (_, res) => {
    res.status(200).sendFile("basicForm/index.html", {
        root: path_1.default.join(__dirname, "../../public"),
    });
};
exports.getFormController = getFormController;
const createNewRegister = (req, res) => {
    const data = req.body;
    const content = Object.entries(data).map(item => item[1]);
    let isRepeatId = false;
    const dataDirectory = path_1.default.join(__dirname, "../data");
    // Check if the file directory is already created and if not then create it
    if (!fs_1.default.existsSync(dataDirectory)) {
        fs_1.default.mkdirSync(dataDirectory);
    }
    // Check if the id of the new file is not repeated with one of the already existing files
    fs_1.default.readdir(dataDirectory, (err, files) => {
        if (err) {
            console.error("Error al leer el directorio:", err);
            return;
        }
        isRepeatId = files
            .filter(item => path_1.default.extname(item) === ".txt")
            .map(item => Number(item.split("_")[1][0]))
            .some(item => item === data.id);
    });
    // Write the new file and return the file on the response
    fs_1.default.writeFile(path_1.default.join(dataDirectory, `/id_${data.id}.txt`), content.join(","), err => {
        switch (true) {
            case err !== null:
                console.error(err);
                res.status(500).json({ message: "ERROR!", err });
                break;
            case !err && isRepeatId:
                res.status(400).json({ message: "ID_ALREADY_EXIST" });
                break;
            case !err && !isRepeatId:
                try {
                    const file = fs_1.default.readFileSync(path_1.default.join(dataDirectory, `/id_${data.id}.txt`));
                    res.status(200).json({
                        message: "OK!",
                        data: {
                            file: {
                                data: file.toString(),
                                name: `id_${data.id}.txt`,
                            },
                        },
                    });
                }
                catch (error) {
                    console.error(err);
                    return res.status(500).send("Error al leer el archivo");
                }
                break;
            default:
                res.status(418).json({ message: "IDK!" });
                break;
        }
    });
};
exports.createNewRegister = createNewRegister;
