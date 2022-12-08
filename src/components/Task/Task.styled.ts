import styled from 'styled-components';
import { LabelColor } from '../../models/theme';

export const TaskWrapper = styled.li`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	background-color: #fff;

	padding: 0.5rem 1rem;

	border-radius: 5px;
	border: 1px solid lightgray;

	box-shadow: ${({ theme }) => theme.shadows.sh1};

	cursor: pointer;
`;

export const TaskLabel = styled.p`
	font-size: 1.5rem;
	color: black;
`;

export const LabelsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

interface LabelCircle {
	color: LabelColor;
	label: string;
}

export const LabelCircle = styled.div<LabelCircle>`
	position: relative;

	height: 15px;
	width: 15px;

	border-radius: 999px;

	background-color: ${(props) => props.theme.colors[props.color]};

	&:hover {
		&::after {
			content: '${(props) => props.label}';
			position: absolute;
			left: 1rem;
			top: -200%;

			background-color: #fff;

			padding: 0.5rem 1rem;

			font-size: 1rem;

			border-radius: 5px;
			border: 1px solid ${(props) => props.theme.colors[props.color]};

			box-shadow: ${({ theme }) => theme.shadows.sh1};

			z-index: 2;
		}
	}
`;
