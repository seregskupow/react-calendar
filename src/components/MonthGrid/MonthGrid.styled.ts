import styled from 'styled-components';

export const MonthWrapper = styled.div`
	height: inherit;
	width: inherit;

	overflow: auto;
`;

export const Grid = styled.div`
	display: grid;
	height: inherit;
	grid-template-rows: repeat(5, minmax(0, 1fr));
	grid-template-columns: repeat(7, minmax(0, 1fr));

	min-width: 1800px;
	min-height: 1000px;
`;
