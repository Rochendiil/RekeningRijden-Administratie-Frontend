import { FormGroup, FormControl } from '@angular/forms';

export abstract class ObjectEditor<T>
{
    private keys: string[];
    form: FormGroup;

    get value()
    {
        let result = {} as T;
        for (let key of this.keys) {
            result[key] = this.form.controls[key].value;
        }
        return result;
    }
    
    set value(value: T)
    {
        for (let key of this.keys) {
            this.form.controls[key].setValue(value[key]);
        }
    }

    constructor(_value: T)
    {
        this.form = new FormGroup(ObjectEditor.toControls(_value));
        this.keys = Object.keys(_value);
    }

    static toControls<T>(template: T)
    {
        let result: { [key: string]: FormControl } = { };
        for (let key in template) {
            result[key] = new FormControl(template[key]);
        }
        return result;
    }
}