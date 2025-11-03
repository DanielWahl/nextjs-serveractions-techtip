import type { Metadata, ResolvingMetadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalData } from "@/app/actions";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});


export async function generateMetadata(
	{ params, searchParams }: any
): Promise<Metadata> {

	const globalData = await getGlobalData();
	console.log("generateMetadata globalData: ", globalData);
	return {
		title: globalData.data.siteName,
		description: globalData.data.siteDescription,
	}
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const globalData = await getGlobalData();
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
