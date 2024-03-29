#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const download = require('download-git-repo');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

program.version('1.0.0','-v, --version')
.command('init <name>')
.action((name)=>{
  if(!fs.existsSync(name)){
    inquirer.prompt([
    {
      name: 'description',
      message: '请输入项目描述'
    }, {
      name: 'author',
      message:'请输入作者名称'
    }]).then((answers)=>{
       const spinner = ora('正在下载模板...');
       spinner.start();
          download('jbf034/scaffold_demo/templates',name,{clone: true},(err)=>{
        if(err){
          spinner.fail();
          console.log(symbols.error, chalk.red(err))
        } else {
          spinner.succeed();
          const fileName = `${name}/package.json`;
          const meta = {
            name,
            description: answers.description,
            author: answers.author
          }
          if(fs.existsSync(fileName)){
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
          }
          console.log(symbols.success, chalk.green('项目初始化完成'))
        }
      })
    })
  } else {
    console.log(symbols.error, chalk.red('项目已经存在'));
  }
});
program.parse(process.argv);