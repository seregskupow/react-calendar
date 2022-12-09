import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './components/App/App';
import { store } from './store';
import GlobalStyles from './styles/globalStyles';
import { theme } from './styles/theme';
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<App />
		</ThemeProvider>
	</Provider>,
	// </React.StrictMode>,
);
