"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
// const readline = require('node:readline')
// const { stdin, stdout } = require('node:process')
// const rl = readline.createInterface({ input: stdin, output: stdout })
// rl.question("Enter an action (ADD, EDIT, LIST, DELETE)", function (ans: string) {
//   console.log(ans)
//   rl.close()
// })
const validActions = ["add", "edit", "list", "delete"];
const args = process.argv.slice(2);
// Print the arguments in order
const action = args[0];
const rest = args.slice(1);
console.log(`First argument: ${args[0]}`);
console.log(`rest of arguments:`, ...rest);
if (!validActions.includes(args[0])) {
    console.log("the provided action is not valid, please try again with a valid action(add, edit, list, delete)");
    process.exit(1);
}
else {
    computeTask(action, rest);
}
function computeTask(action, rest) {
    console.log(`Action: ${action}`);
    // console.log(`rest of arguments:`, ...rest); 
    // todo: start with add a task
    if (action === "add") {
        // check for second cmd line argument to be a string
        if (!rest[0]) {
            console.log(`Please provide a description for your task (e.g. add "Buy groceries")`);
            process.exit(1);
        }
        if (canBeParsedAsNumber(rest[0])) {
            console.log(`The task should be a string of text (e.g. add "Buy groceries")`);
            process.exit(1);
        }
        if (checkFileExists("src/data/tasks.json")) {
            node_fs_1.default.readFile("src/data/tasks.json", "utf8", function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                let json = JSON.parse(data);
                console.log("");
                console.log(json);
                const newTaskID = json.tasks.length > 0 ? json.tasks.at(-1).id + 1 : 0;
                const now = new Date();
                json.tasks.push({
                    id: newTaskID,
                    description: rest[0],
                    status: "todo",
                    createdAt: now,
                    updatedAt: now
                });
                const updatedJSON = JSON.stringify(json, null, 2);
                node_fs_1.default.writeFile('src/data/tasks.json', updatedJSON, { encoding: "utf-8" }, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log(`Task added successfully (ID: ${newTaskID})`);
                });
            });
        }
        else {
            // todo: create file and add task 
        }
    }
    console.log(checkFileExists('src/data/tasks.json'));
    // console.log("")
}
function checkFileExists(fileName) {
    // FileSystem.arguments()
    return node_fs_1.default.existsSync("./" + fileName);
    // return false
}
function canBeParsedAsNumber(value) {
    const number = Number(value);
    return !isNaN(number) && isFinite(number);
}
