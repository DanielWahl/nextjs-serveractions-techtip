import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
			<div className="text-center">
				<div className="mb-8">
					<svg
						className="mx-auto h-32 w-32 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Article Not Found
				</h1>
				<p className="text-xl text-gray-600 mb-8">
					Sorry, we couldn&apos;t find the article you&apos;re looking
					for.
				</p>
				<Link
					href="/"
					className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to all articles
				</Link>
			</div>
		</main>
	);
}
