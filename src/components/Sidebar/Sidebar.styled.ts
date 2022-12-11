import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 2rem;
	margin: 0 auto;

	width: 100%;
	max-width: 500px;

	@media (min-width: 1100px) {
		padding: 2rem 0 2rem 1rem;

		max-width: auto;
	}
`;
