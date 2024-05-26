// import {spawn} from 'child_process';
import fs from 'fs-extra';
import childProcess from 'child_process';
import Chalk from 'chalk';

export const executeCommand = (projectPath, project, spinner) => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = ['install'];
  var ls = childProcess.spawn(npm, args, {
    shell: true,
    stdio: ['inherit', 'pipe'],
    cwd: projectPath
  })
  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })
  ls.stderr.on('data', function (err) {
    console.log('stderr: ' + err)
  })
  ls.once('close', function () {
    console.log('install success...')
    spinner.succeed(Chalk.green('create project successful!'));
    console.log(Chalk.blue(`Done! you can start by running:`));
    console.log(chalk.blue.bold('cd ') + chalk.yellow(project));
    console.log(chalk.blue.bold('npm run dev'));
    console.log(chalk.blue.bold('npm run build'));
  })
}

export const copyTemplate = (originalPath, targetPath) => {
  return fs.copySync(originalPath, targetPath, {overwrite: true});
}

export const createFolder = (name) => {
  try{
    fs.emptyDirSync(name)
  }catch(err){
    throw new Error(err);
  }
  
}

export const isExist = (path) => {
  return fs.pathExistsSync(path);
}