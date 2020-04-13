class Users
{
    constructor()
    {
        this.users = [];
    }
    get()
    {
        return this.users;
    }
    add(user)
    {
        this.users.push(user);
    }

    remove(id)
    {
        this.users = this.users.filter(element => element.id !== id);
    }
}

module.exports = Users;