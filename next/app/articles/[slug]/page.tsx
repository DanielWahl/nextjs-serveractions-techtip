import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/app/actions";
import { IArticle } from "@/types/types";

interface ArticlePageProps {
	params: {
		slug: string;
	};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const slug = (await params)?.slug;
	console.log("Fetching article with slug:", slug);
	const article: IArticle | null = await getArticleBySlug(slug);
	console.log("Fetched article:", article);

	if (!article) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-white">
			{/* Back Button */}
			<div className="bg-gray-50 border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<Link
						href="/"
						className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
			</div>

			{/* Article Header */}
			<article className="max-w-4xl mx-auto px-4 py-12">
				{/* Category and Date */}
				<div className="flex items-center gap-4 mb-6">
					{article.category && (
						<span className="inline-block px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
							{article.category.name}
						</span>
					)}
					{article.publishedAt && (
						<time className="text-sm text-gray-500">
							{new Date(article.publishedAt).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)}
						</time>
					)}
				</div>

				{/* Title */}
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
					{article.title}
				</h1>

				{/* Description */}
				{article.description && (
					<p className="text-xl text-gray-600 mb-8 leading-relaxed">
						{article.description}
					</p>
				)}

				{/* Author */}
				{article.author && (
					<div className="flex items-center mb-8 pb-8 border-b border-gray-200">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
							{article.author.name.charAt(0).toUpperCase()}
						</div>
						<div>
							<p className="font-semibold text-gray-900">
								{article.author.name}
							</p>
							<p className="text-sm text-gray-500">Author</p>
						</div>
					</div>
				)}

				{/* Cover Image */}
				{article.cover?.url && (
					<div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
						<Image
							src={
								article.cover.url.startsWith("http")
									? article.cover.url
									: process.env.NEXT_PUBLIC_STORAGE +
										article.cover.url
							}
							alt={article.cover.alternativeText || article.title}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 896px) 100vw, 896px"
						/>
					</div>
				)}

				{/* Article Content/Blocks */}
				<div className="prose prose-lg max-w-none">
					{article.blocks && article.blocks.length > 0 ? (
						article.blocks.map((block, index) => {
							switch (block.__component) {
								case "shared.rich-text":
									return (
										<div
											key={`${block.__component}-${block.id}-${index}`}
											className="mb-8 text-gray-700 leading-relaxed"
										>
											<div
												dangerouslySetInnerHTML={{
													__html:
														block.body
															?.replace(
																/##\s/g,
																'<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">',
															)
															?.replace(
																/\n/g,
																"</h2>",
															)
															?.replace(
																/-\s/g,
																'<li class="ml-6 mb-2">',
															)
															?.replace(
																/\*([^*]+)\*/g,
																"<em>$1</em>",
															) || "",
												}}
											/>
										</div>
									);

								case "shared.quote":
									return (
										<blockquote
											key={`${block.__component}-${block.id}-${index}`}
											className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg"
										>
											<p className="text-lg italic text-gray-700 mb-2">
												&quot;{block.body}&quot;
											</p>
											{block.title && (
												<cite className="text-sm font-semibold text-gray-900 not-italic">
													— {block.title}
												</cite>
											)}
										</blockquote>
									);

								case "shared.media":
									return (
										<div
											key={`${block.__component}-${block.id}-${index}`}
											className="my-8"
										>
											{/* Media component placeholder */}
											<div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
												Media component
											</div>
										</div>
									);

								case "shared.slider":
									return (
										<div
											key={`${block.__component}-${block.id}-${index}`}
											className="my-8"
										>
											{/* Slider component placeholder */}
											<div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
												Slider component
											</div>
										</div>
									);

								default:
									return null;
							}
						})
					) : (
						<p className="text-gray-600 italic">
							No content available.
						</p>
					)}
				</div>

				{/* Back to Articles */}
				<div className="mt-16 pt-8 border-t border-gray-200">
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
			</article>
		</main>
	);
}
