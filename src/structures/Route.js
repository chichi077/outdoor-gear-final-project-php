// Header route class, used to define routes for the header
// This class uses an pattern called "builder pattern"
export class Route {
	constructor() {
		this.path = '';
		this.label = '';
		this.authenticated = false;
		this.admin = false;
	}

	setPath(path) {
		this.path = path;
		return this;
	}

	setLabel(label) {
		this.label = label;
		return this;
	}

	setAuthenticated() {
		this.authenticated = true;
		return this;
	}

	setAdmin() {
		this.authenticated = true;
		this.admin = true;
		return this;
	}
}
