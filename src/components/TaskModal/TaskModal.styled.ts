import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;
	z-index: 10;
`;

export const ModalBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background-color: hsla(0, 0%, 100%, 0.612);

	z-index: 10;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: flex-end;

	width: 100%;
`;

export const ModalForm = styled.form`
	width: 30%;
	min-width: 300px;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;

	background-color: #ffffff;

	box-shadow: ${(props) => props.theme.shadows.sh2};
	z-index: 11;
`;

const sharedInputStyle = ({ theme }) => css`
	width: 100%;
	font-size: 2rem;

	padding: 1rem;

	border-radius: 15px;
	border: 2px solid;
	border-color: lightgrey;

	transition: all 0.3s ease;

	&:focus {
		border-color: ${theme.colors.blue};
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
})`
	${sharedInputStyle};
	resize: none;
`;

export const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	background-color: ${(props) => props.theme.colors.blue};
	color: #fff;

	border-radius: 10px;
	border: 1px solid ${(props) => props.theme.colors.blue};

	padding: 1rem;

	font-size: 2rem;
	text-decoration: none;

	transition: all 0.2s ease;

	cursor: pointer;

	& svg {
		font-size: 2rem;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		background-color: #d9e0ff;
		color: ${(props) => props.theme.colors.blue};
	}
`;

export const Error = styled.span`
	font-size: 1.5rem;
	color: ${(props) => props.theme.colors.red};
`;
