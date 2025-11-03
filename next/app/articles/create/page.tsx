"use client";

import { createArticle } from "@/app/actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import SaveButton from "@/components/forms/SaveButton";

export const formInitialState = { error: false, success: false, message: "" };
export default function CreateArticlePage() {
	const [state, formAction] = useActionState(
		createArticle,
		formInitialState,
	);

	useEffect(() => {
		console.log("state: ", state);

	}, [state])


	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
				<div className="max-w-4xl mx-auto">
					<Link
						href="/"
						className="inline-flex items-center text-white hover:text-blue-100 transition-colors mb-4"
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
						Back to articles
					</Link>
					<h1 className="text-4xl font-bold">Create New Article</h1>
					<p className="text-xl text-blue-100 mt-2">
						Share your story with the world
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="max-w-4xl mx-auto px-4 py-12">
				<div className="bg-white rounded-xl shadow-lg p-8">
					{state.message && (
						<div
							className={`mb-6 p-4 rounded-lg ${
								state.success === true
									? "bg-green-50 border border-green-200 text-green-800"
									: "bg-red-50 border border-red-200 text-red-800"
							}`}
						>
							<div className="flex items-center">
								{state.success === true ? (
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								)}
								<span className="font-medium">{state.message}</span>
							</div>
						</div>
					)}

					<form action={formAction} className="space-y-6">
						{/* Title */}
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="title"
								name="title"
								required
								
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
								placeholder="Enter article title"
							/>
						</div>

						{/* Slug */}
						<div>
							<label
								htmlFor="slug"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Slug <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="slug"
								name="slug"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
								placeholder="article-slug-url-friendly"
							/>
							<p className="mt-1 text-sm text-gray-500">
								URL-friendly version of the title (e.g.,
								my-article-title)
							</p>
						</div>

						{/* Description */}
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Description <span className="text-red-500">*</span>
							</label>
							<textarea
								id="description"
								name="description"
								required
								maxLength={80}
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
								placeholder="Brief description of your article"
							/>
						</div>

						{/* Content */}
						<div>
							<label
								htmlFor="content"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Content
							</label>
							<textarea
								id="content"
								name="content"
								
								rows={12}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none font-mono text-sm"
								placeholder="Write your article content here..."
							/>
							<p className="mt-1 text-sm text-gray-500">
								You can use markdown formatting (## for headings, - for
								lists, * for emphasis)
							</p>
						</div>

						{/* Submit Button */}
						<div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
							<Link
								href="/"
								className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
							>
								Cancel
							</Link>
							<SaveButton state={state}/>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
