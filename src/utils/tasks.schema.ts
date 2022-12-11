export const TasksValidationSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$ref: '#/definitions/DayTasks',
	definitions: {
		DayTasks: {
			type: 'object',
			additionalProperties: {
				type: 'array',
				items: {
					$ref: '#/definitions/Task',
				},
			},
		},
		Task: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
				},
				title: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
				labels: {
					type: 'array',
					items: {
						$ref: '#/definitions/Label',
					},
				},
				date: {
					type: 'number',
				},
				orderIndex: {
					type: 'number',
				},
			},
			required: ['id', 'title', 'description', 'labels', 'date', 'orderIndex'],
			additionalProperties: false,
		},
		Label: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
				},
				title: {
					type: 'string',
				},
				color: {
					$ref: '#/definitions/LabelColor',
				},
			},
			required: ['id', 'title', 'color'],
			additionalProperties: false,
		},
		LabelColor: {
			type: 'string',
			enum: ['blue', 'green', 'yellow', 'red', 'lightGray', 'darkGray'],
		},
	},
};

export const TaskValidationSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	definitions: {
		Task: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
				},
				title: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
				labels: {
					type: 'array',
					items: {
						$ref: '#/definitions/Label',
					},
				},
				date: {
					type: 'number',
				},
				orderIndex: {
					type: 'number',
				},
			},
			required: ['id', 'title', 'description', 'labels', 'date', 'orderIndex'],
			additionalProperties: false,
		},
		Label: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
				},
				title: {
					type: 'string',
				},
				color: {
					$ref: '#/definitions/LabelColor',
				},
			},
			required: ['id', 'title', 'color'],
			additionalProperties: false,
		},
		LabelColor: {
			type: 'string',
			enum: ['blue', 'green', 'yellow', 'red', 'lightGray', 'darkGray'],
		},
	},
};
