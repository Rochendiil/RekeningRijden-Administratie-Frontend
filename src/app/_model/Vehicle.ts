
export class Vehicle
{
    id: number = 0;
    brand: string = "";
    model: string = "";
    licenseNumber: string = "";
    buildYear: number = new Date().getFullYear();
    trackerId: string = "";
    ownerId: number = 0;
}