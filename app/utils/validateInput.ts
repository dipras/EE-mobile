class validateInput {
    name: string;
    str: string;
    result: string;

    constructor(name: string, str: string) {
        this.name = name;
        this.str = str;
        this.result = "";
    }

    notEmpty() {
        if(this.str == "") {
            this.result = `${this.name} is empty`;
        }

        return this;
    }

    isEmail() {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!pattern.test(this.str)) {
            this.result = `${this.name} is not valid email`
        }

        return this;
    }

    min(minLength: number) {
        if(minLength > this.str.length) {
            this.result = `${this.name} is have minimum ${minLength} character`;
        }

        return this;
    }

    max(maxLength: number) {
        if(maxLength < this.str.length) {
            this.result = `${this.name} is have maximum ${maxLength} character`;
        }

        return this;
    }
}

export default validateInput;