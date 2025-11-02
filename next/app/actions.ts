"use server";
import { revalidateTag } from "next/cache";

export const fetchAction = async (
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	data: any,
	revalidateTagName: string,
	noSubDataBody?: boolean,
): Promise<any> => {
	const response = await fetch(process.env.NEXT_PUBLIC_API + url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"api-key": process.env.TOKEN + "",
		},
		next: { tags: [revalidateTagName] },
		body:
			method === "POST" || method === "PUT"
				? noSubDataBody
					? JSON.stringify(data)
					: JSON.stringify({ data: data })
				: null,
	})
		.then((res) => res.json())
		.then((res) => {
			//console.log("fetchAction res - " + url + ": ", res);
			if (method === "DELETE" && !res.error) return res;

			if ((!res.data && !res.user) || res.error)
				throw new Error(res?.error?.message);

			return res;
		})
		.catch((error) => {
			console.error("An error occurred - " + url + ": ", error.message);
			return {
				error: true,
				success: false,
				message: "" + error.message,
			};
		});

	if (response && !response.error) {
		//console.log("if response - " + url + ": ", response);

		revalidateTag(revalidateTagName, "max");

		return {
			error: false,
			success: true,
			message: "Erfolgreich gespeichert - " + Date.now(),
			response: response,
		};
	} else {
		//console.log("else response - " + url + ": ", response);
		return {
			error: true,
			success: false,
			message: "" + response.message,
		};
	}
};

export const fetchActionGET = async (
	url: string,
	revalidateTagName: string,
): Promise<any> => {
	const response = await fetch(process.env.NEXT_PUBLIC_API + url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"api-key": process.env.TOKEN + "",
		},
		next: { tags: [revalidateTagName] },
	}).then((res) => res.json());

	if (response) {
		//console.log("fetchActionGET response", response);
		revalidateTag(revalidateTagName, "max");
		return response;
	} else {
		return null;
	}
};

export const getGlobalData = async () => {
	return await fetchActionGET("/global", "global-data");
};
