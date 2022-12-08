import { LabelColor } from '@/models/theme';
import { FC } from 'react';
import { LabelWrapper } from './Label.styled';

interface LabelProps {
	label: string;
	color?: LabelColor;
}

const Label: FC<LabelProps> = ({ label, color = 'blue' }) => {
	return <LabelWrapper>{label}</LabelWrapper>;
};

export default Label;
