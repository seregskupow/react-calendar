import styled from 'styled-components';

export const Grid = styled.div`
	display: grid;
	flex: 1 1 0%;
	grid-template-rows: repeat(5, minmax(0, 1fr));
	grid-template-columns: repeat(7, minmax(0, 1fr));
`;
