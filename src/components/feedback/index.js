export default class Validator {
	constructor() {
		this.form = document.forms[0];
		this.fields = document.forms[0].elements;
		this._init();
	}

	_init() {
		this.formSubmit();
	}

	isEmpty(field, error) {
		if (!field.value.length) {
			this.formError('required field', field);
			error = true;
		} else {
			this.formError('', field);
			error = false;
		}

		return error;
	}

	valid() {
		const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isEmpty = false;
		let isEmail = false;

		for (let field of this.fields) {
			if (field.tagName !== 'BUTTON') {
				isEmpty = this.isEmpty(field, isEmpty);

				switch(field.name) {
					case 'email':
						if (!regExp.test(String(field.value).toLowerCase()) && field.value.length) {
							this.formError('wrong email', field);
							isEmail = true;
						}
						break;
					default:
						break;
				}
			}
		}

		return isEmpty || isEmail;
	}

	formError(message, field) {
		const fieldError = field.nextElementSibling;

		fieldError.innerText = message;
	}

	formSubmit() {
		const buttonSendForm = document.getElementById('send');

		buttonSendForm.addEventListener('click', evt => {
			if (this.valid()) {
				evt.preventDefault();
			}
		});
	}
}