'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { Container, CssBaseline } from '@mui/material';
import { AppToolbar } from '@/components/UI/AppToolbar';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<html lang='en'>
				<body>
					<CssBaseline />
					<header>
						<AppToolbar />
					</header>
					<main>
						<Container maxWidth='xl' sx={{ mt: 10 }}>
							{children}
						</Container>
					</main>
				</body>
			</html>
		</Provider>
	);
}
