import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, ValidationErrors } from '@angular/forms';

@Pipe({
    name: 'validations',
    pure: false
})

export class ValidationsPipe implements PipeTransform {
    validations: { [key: string]: string } = {}
    constructor() {
            this.validations = {
              "required": "The field $0 is required",
              "minlength": "the field $0 must have at least $1 character(es)",
              "maxlength": "the field $0 must have a maximum of $1 characteres",
              "min": "the field $0 must be greater $1",
              "max": "the field $0 must be less than $1"
           }
    }

    transform(value: AbstractControl | null,myForm:FormGroupDirective, ...args: any[]): string {
        if((!value || !value.touched || value.valid || !value.errors) && !myForm.submitted && !myForm.valid) return "";

        const error = value?.errors ? Object.keys(value.errors)[0] : '';

        const message = this.validations[error];
        const field = args[0] ?? "";
        const params = args.slice(1);

       if(value?.errors) params[0] = this.getParams(error, value.errors[error]) ?? params[0]

        return message ?  message.replace("$0", field)
                      .replace("$1", params[0])
                      .replace("$2", params[1]) : '';
    }

    getParams(errorName:string, error:ValidationErrors){
        switch(errorName){
            case "minlength":
            case "maxlength":
                return error['requiredLength'];

            case "min":
                return error['min'];

            case "max":
                return error['max'];

            default:
                return null;
        }
    }
}
