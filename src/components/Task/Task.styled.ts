import styled from 'styled-components';

export const TaskWrapper = styled.li`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	background-color: #fff;

	padding: 0.3rem 0.5rem;

	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme.colors.lightGray};

	box-shadow: ${({ theme }) => theme.shadows.sh1};

	cursor: pointer;
`;

export const TaskTitle = styled.p`
	font-size: 1.2rem;
	color: black;
`;

export const LabelsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;
