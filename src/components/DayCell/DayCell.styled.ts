import styled, { css } from 'styled-components';

import { motion } from 'framer-motion';

interface DayContainerProps {
	$overflow: boolean;
}

export const DayContainer = styled.div<DayContainerProps>`
	position: relative;

	display: flex;
	flex-direction: column;

	padding: 0rem 1rem;
	background-color: #ffffff;

	transition: background-color 0.3s ease, border-color 0.3s ease;

	&:hover {
		background-color: #d9e0ff;
		border-color: ${(props) => props.theme.colors.blue};
	}

	&::before {
		display: ${(props) => (props.$overflow ? 'block' : 'none')};

		content: '';
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		box-shadow: inset 0px -17px 11px -6px rgba(255, 255, 255, 1);

		pointer-events: none;
	}
`;

export const CellHeader = styled.div`
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	height: 50px;
`;

export const DayName = styled.p`
	font-size: 1.4rem;
	font-weight: bold;
`;

const HeaderButton = styled.button`
	position: absolute;

	padding: 0.5rem;

	border: 1px solid transparent;
	border-radius: 999px;

	transition: transform 0.3s ease, border 0.3s ease;

	cursor: pointer;

	& svg {
		font-size: 2rem;
		color: gray;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.blue};

		& svg {
			color: ${({ theme }) => theme.colors.blue};
		}
	}
`;

export const DayEventsButton = styled(HeaderButton)`
	right: 0.5rem;
	top: 0.8rem;
`;

export const AddTaskButton = styled(HeaderButton)`
	left: 0.5rem;
	top: 0.8rem;

	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

interface DayNumberProps {
	currentMonth: boolean;
	today: boolean;
}

export const DayNumber = styled.p<DayNumberProps>`
	font-weight: light;

	font-size: 2rem;

	color: ${(props) => (props.currentMonth ? props.theme.colors.blue : 'gray')};

	${({ theme, today }) =>
		today === true &&
		css`
			padding: 1rem;
			border-radius: 999px;

			background-color: ${(props) => props.theme.colors.blue};
			color: #fff;
		`}
`;
export const TasksWrapper = styled.div`
	height: calc(100% - 50px);
`;
export const TasksContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	height: 100%;

	padding: 0.5rem 0.5rem 1.5rem 0;

	overflow-y: auto;

	overscroll-behavior: contain;
`;

export const HolidaysContainer = styled(motion.ul)`
	position: absolute;
	top: 5rem;
	left: 1rem;

	width: calc(100% - 2rem);
	max-height: calc(100% - 6rem);

	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;

	background-color: #ffffff;

	border: 1px solid ${(props) => props.theme.colors.lightGray};
	border-radius: ${(props) => props.theme.containerBrdrR};

	box-shadow: ${(props) => props.theme.shadows.sh1};

	overflow: auto;

	z-index: 10;
`;

export const HolidayName = styled.li`
	font-size: 1.5rem;

	&:not(:nth-last-child()) {
		border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
		padding-bottom: 0.5rem;
	}
`;
