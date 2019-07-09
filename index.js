#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const download = require('download-git-repo');
const fs = require('fs');

program.version('1.0.0','-v, --version')
.command('init <name>')
.action((name)=>{
  inquirer.prompt([
  {
    name: 'description',
    message: '请输入项目描述'
  }, {
    name: 'author',
    message:'请输入作者名称'
  }]).then((answers)=>{
    download('git@github.com:jbf034/scaffold_demo.git#master',name,{clone: true},(err)=>{
      const meta = {
        name,
        description: answers.description,
        author: answers.author
      }
      const filename = `${name}/package.json`;
      const content = fs.readFileSync(fileName).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(filename, result);
    })
  })
});
program.parse(process.argv);