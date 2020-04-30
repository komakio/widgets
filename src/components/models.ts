export interface ProfileRequestCreation {
    _id?: string;
    firstName: string;
    lastName: string;
    address: Address;
    phone: Phone;
    email: string;
}

interface Location {
    type: 'Point';
    coordinates: [number, number];
}

class Address {
    raw: string;
    extra?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    location: Location;
}
  
interface Phone {
    dialCode?: string;
    number: string;
}