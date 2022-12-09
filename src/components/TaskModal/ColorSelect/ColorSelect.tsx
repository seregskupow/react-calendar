import { FC } from 'react';

import { LabelColor, LabelColorTitle } from '@/models';
import { theme } from '@/styles/theme';

import { FormData } from '../TaskModal';

import { ControllerRenderProps } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import _ from 'lodash';

export interface ColorOption {
	value: string;
	label: LabelColorTitle;
	color: LabelColor;
}

export const colourOptions: ColorOption[] = Object.entries(theme.colors).map((color) => {
	const [key, value] = color;
	return {
		value: key,
		label: _.capitalize(key),
		color: value,
	} as ColorOption;
});

const dot = (color = 'transparent') => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: 'block',
		marginRight: 8,
		height: 10,
		width: 10,
	},
});

const colourStyles: StylesConfig<ColorOption> = {
	control: (styles) => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: '10px',
		borderWidth: '2px',
		':active': {
			borderColor: theme.colors.blue,
			boxShadow: '0 0 1px 4px #4362ee63',
		},
		':hover': {
			borderColor: theme.colors.blue,
			boxShadow: '0 0 1px 4px #4362ee63',
		},
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: isDisabled
				? undefined
				: isSelected
				? data.color
				: isFocused
				? color.alpha(0.1).css()
				: undefined,
			color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',
			fontSize: '1.5rem',

			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
			},
		};
	},
	input: (styles) => ({ ...styles, ...dot(), fontSize: '1.5rem' }),
	placeholder: (styles) => ({ ...styles, ...dot('#ccc'), fontSize: '1.5rem' }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color), fontSize: '1.5rem' }),
	menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const ColorSelect: FC<{ field: ControllerRenderProps<FormData, any> }> = ({ field }) => (
	<Select
		{...field}
		isMulti={false}
		value={colourOptions.find((opt) => opt.value === field.value)}
		options={colourOptions}
		styles={colourStyles}
		menuPortalTarget={document.body}
		onChange={(val) => field.onChange(val!.value)}
	/>
);

export default ColorSelect;
