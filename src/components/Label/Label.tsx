import { FC } from 'react';
import { LabelColor } from '@/models/theme';
import { LabelElement } from './Label.styled';

interface LabelProps {
	title: string;
	color?: LabelColor;
	fontSize?: number;
}

const Label: FC<LabelProps> = ({ title, fontSize, color = 'blue' }) => {
	return (
		<LabelElement fontSize={fontSize} color={color}>
			{title}
		</LabelElement>
	);
};

export default Label;
