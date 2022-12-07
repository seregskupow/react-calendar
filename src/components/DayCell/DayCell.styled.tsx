import styled, { css } from 'styled-components';

export const DayContainer = styled.div`
	display: flex;
	flex-direction: column;

	padding: 1rem;

	border: 1px solid lightgray;

	transition: background-color 0.3s ease, border-color 0.3s ease;

	&:hover {
		background-color: #d9e0ff;
		border-color: ${(props) => props.theme.colors.blue};
	}
`;

export const CellHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

export const DayName = styled.p`
	font-size: 2rem;
	font-weight: bold;
`;

interface DayNumberProps {
	currentMonth: boolean;
	today: boolean;
}

export const DayNumber = styled.p<DayNumberProps>`
	font-weight: light;

	font-size: 1.5rem;

	color: ${(props) => (props.currentMonth ? 'grey' : 'black')};

	${({ theme, today }) =>
		today === true &&
		css`
			padding: 1rem;
			border-radius: 999px;

			background-color: ${(props) => props.theme.colors.blue};
			color: #fff;
		`}
`;
