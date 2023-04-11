interface Contact extends Address { // Extends Address interface, so it has all the properties of Address.
    id: number;
    name: string;
    birthDate?: Date; // Optional property
}

interface Address {
    line1: string;
    line2: string;
    province: string;
    region: string;
    postalCode: string;
}

let primaryContact: Contact = {
    birthDate: new Date("01-01-1980"),
    id: 12345,
    name: "Jamie Johnson",
    postalCode: "V1V 1V1",
    line1: "123 Main Street",
    line2: "Suite 100",
    province: "BC",
    region: "Vancouver"
};