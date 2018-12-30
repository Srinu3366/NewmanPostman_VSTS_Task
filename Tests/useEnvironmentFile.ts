import mockanswer = require('azure-pipelines-task-lib/mock-answer');
import mockrun = require('azure-pipelines-task-lib/mock-run');
import path = require('path')

let taskPath = path.join(__dirname, '..', 'NewmanPostman', 'newmantask.js');

let runner: mockrun.TaskMockRunner = new mockrun.TaskMockRunner(taskPath);
let filePath = path.normalize('/srcDir/collection.json');
let environment = path.normalize('/srcDir/environment.json');

runner.setInput("collectionSourceType", 'file');
runner.setInput("environmentSourceType", 'file');
runner.setInput("collectionFileSource", filePath);
runner.setInput("environmentFile", environment);


let answers = <mockanswer.TaskLibAnswers>{
    "checkPath": {},
    "which": {
        'newman': 'newman'
    },
    "stats": {},
    "exec": {}
};
answers.checkPath[filePath] = true;
answers.checkPath[environment] = true;
answers.checkPath['newman'] = true;
answers.stats[filePath] = true;

answers.exec[`newman run ${filePath} -e ${environment}`] = { 'code': 0, 'stdout': 'OK' }

runner.setAnswers(answers);

runner.run();