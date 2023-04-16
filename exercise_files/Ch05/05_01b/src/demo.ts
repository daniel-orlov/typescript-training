interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
}

@log
class ContactRepository {
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
        return this.contacts.find(x => x.id === id);
    }

    @authorize("ContactEditor")
    save(contact: Contact): void {
        const existing = this.getContactById(contact.id);

        if (existing) {
            Object.assign(existing, contact);
        } else {
            this.contacts.push(contact);
        }
    }
}