import Image from "next/image";
import { getAllNews, getGlobalData } from "@/app/actions";
import Link from "next/link";
import { IArticle } from "@/types/types";

export default async function Home() {
	const globalData = await getGlobalData();
	const news = await getAllNews();
	console.log("Global Data on Home Page:", globalData);
	console.log("News Data on Home Page:", news);

	const newsItems: IArticle[] = news?.data || [];

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-5xl font-bold mb-4">News & Updates</h1>
					<p className="text-xl text-blue-100">
						Stay updated with our latest news and articles
					</p>
				</div>
			</div>

			{/* News Grid */}
			<div className="max-w-7xl mx-auto px-4 py-12">
				{newsItems.length === 0 ? (
					<div className="text-center py-20">
						<div className="text-gray-400 mb-4">
							<svg
								className="mx-auto h-24 w-24"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1}
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-semibold text-gray-700 mb-2">
							No news available yet
						</h3>
						<p className="text-gray-500">
							Check back later for updates
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{newsItems.map((item: IArticle) => (
							<article
								key={item.id}
								className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
							>
								{/* Image */}
								{item.cover?.url && (
									<div className="relative h-48 w-full bg-gray-200">
										<Image
											src={
												item.cover.url.startsWith(
													"http",
												)
													? item.cover.url
													: process.env
															.NEXT_PUBLIC_STORAGE +
														item.cover.url
											}
											alt={
												item.cover.alternativeText ||
												item.title
											}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
								)}

								{/* Content */}
								<div className="p-6 flex flex-col flex-grow">
									{/* Category & Date */}
									<div className="flex items-center justify-between mb-3">
										{item.category && (
											<span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
												{item.category.name}
											</span>
										)}
										{item.publishedAt && (
											<time className="text-xs text-gray-500">
												{new Date(
													item.publishedAt,
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</time>
										)}
									</div>

									{/* Title */}
									<h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
										{item.title}
									</h2>

									{/* Description */}
									{item.description && (
										<p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
											{item.description}
										</p>
									)}

									{/* Author & Read More */}
									<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
										{item.author && (
											<div className="flex items-center text-sm text-gray-600">
												<div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
													{item.author.name
														.charAt(0)
														.toUpperCase()}
												</div>
												<span className="font-medium">
													{item.author.name}
												</span>
											</div>
										)}

										{/* Read More Link */}
										<Link
											href={`/articles/${item.slug}`}
											className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
										>
											Read
											<svg
												className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
