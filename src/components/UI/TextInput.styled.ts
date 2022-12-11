import styled, { css } from 'styled-components';

const sharedInputStyle = (props: any) => css`
	width: 100%;
	font-size: 1.5rem;

	padding: 1rem;

	border-radius: ${(props) => props.theme.containerBrdrR};
	border: 2px solid;
	border-color: ${props.theme.colors.lightGray};

	transition: all 0.3s ease;

	&:focus {
		border-color: ${props.theme.colors.blue};
		box-shadow: 0 0 1px 4px #4362ee63;
	}
`;

export const TextInput = styled.input.attrs({
	type: 'text',
})`
	${sharedInputStyle};
`;

export const TextArea = styled.textarea.attrs({
	rows: 5,
	cols: 5,
})`
	${sharedInputStyle};
	resize: none;
`;
