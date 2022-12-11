export const checkJSONExtention = (fileName: string) => {
	const dot = fileName.lastIndexOf('.') + 1;
	const extFile = fileName.substr(dot, fileName.length).toLowerCase();
	return extFile === 'json';
};
