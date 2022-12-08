import chroma from 'chroma-js';
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

export const TaskTitle = styled.p`
	font-size: 1.5rem;
	color: black;
`;

export const LabelsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

