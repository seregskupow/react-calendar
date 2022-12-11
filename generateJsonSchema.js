import fs from 'fs';
import tsj from 'ts-json-schema-generator';

// const config = {
// 	path: './src/models/DayTasks.ts',
// 	tsconfig: './tsconfig.json',
// 	type: '*',
// };

// const output_path = './tasks_schema.json';

const config = {
	path: './src/models/task.ts',
	tsconfig: './tsconfig.json',
	type: '*',
};

const output_path = './task_schema.json';

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err) => {
	if (err) throw err;
});
