export class User {
	constructor(id, firstName, lastName, email, password, isAdmin = false) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.isAdmin = isAdmin;
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	passwordMatches(password) {
		return this.password === password;
	}

	toJSON() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password,
			isAdmin: this.isAdmin,
		};
	}

	static fromJSON(data) {
		const user = new User(data.id, data.firstName, data.lastName, data.email, data.password, data.isAdmin);

		return user;
	}
}
