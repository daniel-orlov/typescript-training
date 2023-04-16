type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson",
    status: "active"
};

type ContactFields = keyof Contact

const field: ContactFields = "status";

function getValue<T>(source: T, propertyName: keyof T) {
    return source[propertyName];
}

const value = getValue(primaryContact, "status");

const anotherValue = getValue({key: 2, otherKey: 3}, "key");


