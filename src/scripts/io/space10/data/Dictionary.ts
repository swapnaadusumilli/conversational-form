// namespace
namespace io.space10 {

	export interface IDictionaryOptions{
		data?: Object;
		aiQuestions?: Object;
		userImage: string;
	}
	// class
	export class Dictionary{
		private static instance: Dictionary;

		constructor(options?: IDictionaryOptions){
			Dictionary.instance = this;

			// allow for Dictionary data overwrite
			if(options && options.data){
				this.validateAndSetNewData(options.data);
			}

			if(options.userImage)
				this.data["user-image"] = options.userImage;
			
			if(options && options.aiQuestions)
				this.AIQuestions = options.aiQuestions;
		}

		public static get(id:string): string{
			const ins: Dictionary = Dictionary.instance;
			let value: string = ins.data[id];
			if(!value)
				value = ins.data["entry-not-found"];

			return value;
		}

		public static getAIResponse(tagType:string): string{
			const ins: Dictionary = Dictionary.instance;
			let value: string = ins.AIQuestions[Dictionary.AIType][tagType];
			if(!value){
				// value not found, so pick a general one
				const generals: Array<string> = ins.AIQuestions[Dictionary.AIType]["general"].split("|");
				value = generals[Math.floor(Math.random() * generals.length)];
			}

			return value;
		}

		private validateAndSetNewData(data: any){
			if(!data["entry-not-found"])
				throw new Error("SPACE10 CUI Dictionary Error, 'entry-not-found' is undefined");
			if(!data["input-placeholder"])
				throw new Error("SPACE10 CUI Dictionary Error, 'input-placeholder' is undefined");
			
			this.data = data;
		}

		// can be overwritten
		protected data: any = {
			"user-image": "base64 fallback..?",
			"entry-not-found": "Dictionary item not found.",
			"input-placeholder": "Type your answer here ...",
			"input-placeholder-error": "Your input is not correct ...",
		}

		// default...
		public static AIType = "robot";
		protected AIQuestions: any = {
			"robot": {
				"thumb": "data:image/jpeg;charset=utf-8;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MzU4RUQ3Mjk0M0IxMUU2QUYxQzg3RUY5REZFRTA3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MzU4RUQ3Mzk0M0IxMUU2QUYxQzg3RUY5REZFRTA3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzNThFRDcwOTQzQjExRTZBRjFDODdFRjlERkVFMDdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkzNThFRDcxOTQzQjExRTZBRjFDODdFRjlERkVFMDdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQACAYGBgYGCAYGCAwIBwgM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",
				"name": "Your name?",
				"email": "Fill out your e-mail",
				"password": "Password needed",
				"tel": "Insert telephone number",
				"radio": "I need you to select one of these",
				"checkbox": "As many as you want.",
				"select": "Choose from the dropdown",
				"general": "Lala|Crazy monkey|What?",
			},
			"sonny": {
				"thumb": "data:image/jpeg;charset=utf-8;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNzJDM0VGRDkzREQxMUU2QUYxQzg3RUY5REZFRTA3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNzJDM0VGRTkzREQxMUU2QUYxQzg3RUY5REZFRTA3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MkMzRUZCOTNERDExRTZBRjFDODdFRjlERkVFMDdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM3MkMzRUZDOTNERDExRTZBRjFDODdFRjlERkVFMDdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQACAYGBgYGCAYGCAwIBwgM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",
				"name": "I am wondering wht your name is..?",
				"email": "Fill out your e-mail",
				"password": "Password needed",
				"tel": "Insert telephone number",
				"radio": "I need you to select one of these",
				"checkbox": "As many as you want.",
				"select": "Choose from the dropdown",
				"general": "Lala|Crazy monkey|What?",
			},
		}
	}
}