import { FormControl } from '@angular/forms';

export class Globals
{
    static url: string = "http://192.168.24.180:8081/rest";
    // static url: string = "http://localhost:3000";

    // https://stackoverflow.com/a/2117523
    static getUuid(): string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}