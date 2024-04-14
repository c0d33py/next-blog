import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import { ThemeProvider } from "../utils/Provider";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next Blog",
	description: "A simple blog built with Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${firaCode.className} h-full bg-amber-50 text-indigo-950 dark:bg-slate-950 dark:text-amber-50 dark:selection:bg-purple-500`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<Navbar />
					<main className="max-w-7xl mx-auto px-6 lg:px-8">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
