#!/usr/bin/env node

import { program } from 'commander';
// import * as inquirer from 'inquirer';
// import { prompt } from 'inquirer';
import inquirer from 'inquirer';
import path from 'path';
import ora from 'ora';

import { createFolder, isExist, copyTemplate, executeCommand} from './utils';
import { ROOT_PATH } from './constant';
import { start, startCi } from './runDev';
import { build } from './runBuild';


program.version('1.0.1').parse(process.argv);

program.command('new <projectName>').action(async (projectName) => {

  const projectPath = ROOT_PATH +'/'+ projectName;

  if(isExist(ROOT_PATH +'/'+ projectName)){
    const selectAnswer = await inquirer.prompt([{ 
      type: 'confirm',
      message: '是否重新创建项目',
      name: 'reCreate'
    }]);

    if(!selectAnswer.reCreate){
      return false;
    }

    const spanner = ora('creating project').start();
    createFolder(projectPath);
    copyTemplate(path.resolve(__dirname, 'template'), projectName);
    executeCommand(projectPath, projectName, spanner)
  }else{
    const spanner = ora('creating project').start();
    createFolder(projectPath);
    copyTemplate(path.resolve(__dirname, 'template'), projectName);
    executeCommand(projectPath, projectName, spanner)
  }
})

program.command('dev').action(() => {
  // console.log('dev');
  start();
})

program.command('build').action(() => {
  // console.log('build');
  build();
})


program.command('devCi').action(() => {
  // console.log('build');
  startCi();
})


program.parse();


