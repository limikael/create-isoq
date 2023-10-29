#!/usr/bin/env node

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {createProjectStructureFromTemplate} from "./js-util.js";
import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let yargsConf=yargs(hideBin(process.argv))
    .positional("project dir",{
        description: "Project dir (required).",
    })
    .option("package-manager",{
        description: "Package manager to use.",
        choices: ["npm","yarn"],
        default: "npm"
    })
    .strictOptions()
    .usage("create-isoq -- Isoq app scaffolder.")

let options=yargsConf.parse();

if (options._.length!=1) {
	yargsConf.showHelp();
	process.exit();
}

let appDir=options._[0];

console.log("Creating isoq app in: "+appDir);

let replacements={
	$$__PROJECTNAME__: appDir,
	$$__PACKAGEMANAGER__: options.packageManager
};

await createProjectStructureFromTemplate(appDir,path.join(__dirname,"project-template"),replacements)
