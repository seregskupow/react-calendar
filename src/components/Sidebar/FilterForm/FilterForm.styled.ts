import styled from 'styled-components';

export const FilterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;

	background-color: #fff;

	border: 1px solid ${({ theme }) => theme.colors.lightGray};

	border-radius: ${(props) => props.theme.containerBrdrR};

	box-shadow: ${(props) => props.theme.shadows.sh1};
`;
