export interface IStrapiFetchResponse<T> {
	data: T;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface IImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

export interface ICover {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: {
		thumbnail?: IImageFormat;
		small?: IImageFormat;
		medium?: IImageFormat;
		large?: IImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: any;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IAuthor {
	id: number;
	documentId: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface ICategory {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IBlock {
	__component: string;
	id: number;
	[key: string]: any;
}

export interface IArticle {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	cover: ICover;
	author: IAuthor;
	category: ICategory;
	blocks: IBlock[];
}

export type INewsResponse = IStrapiFetchResponse<IArticle[]>;
