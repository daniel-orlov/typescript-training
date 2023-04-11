type ContactName = string;

enum ContactStatus {
    Active = "active",
    Inactive = "inactive",
    New = "new"
}

// String literal type
type ContactStatusString = "active" | "inactive" | "new";

type ContactBirthDate = Date | string | number;

interface Contact {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

interface Address {
    line1: string;
    line2: string;
    province: string;
    region: string;
    postalCode: string;
}

interface AddressableContactViaExtension extends Contact, Address {
}

// Other way to define AddressableContact
type AddressableContact = Contact & Address; // Intersection type

function getBirthDate(contact: Contact) {
    if (typeof contact.birthDate === "number") {
        return new Date(contact.birthDate);
    } else if (typeof contact.birthDate === "string") {
        return Date.parse(contact.birthDate);
    } else {
        return contact.birthDate;
    }
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson"
};
