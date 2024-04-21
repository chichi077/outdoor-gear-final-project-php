export function safeJsonParse(json) {
	if (!json) return null;

	try {
		return JSON.parse(json);
	} catch {
		return null;
	}
}
