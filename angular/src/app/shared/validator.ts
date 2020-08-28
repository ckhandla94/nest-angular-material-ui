import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidator {

    static email(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);

            return (control.value && !emailRegex.test(control.value) ? { email: true } : null);
        };
    }

    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*)[A-Za-z\d][A-Za-z\d!@#$%^&*()_.,+]{2,}$/);
            return (control.value && !regex.test(control.value) ? { strongPassword: true } : null);
        };
    }

    static numaric(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regex = new RegExp(/^[0-9]{2,}$/);
            return (control.value && !regex.test(control.value) ? { numaric: true } : null);
        };
    }
}