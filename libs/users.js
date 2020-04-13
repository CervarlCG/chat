class Users
{
    constructor()
    {
        this.users = [];
    }
    get(id)
    {
        if(!id)
            return this.users;
        else
            return this.search(id);
    }
    add(user)
    {
        this.users.push(user);
    }

    remove(id)
    {
        this.users = this.users.filter(element => element.id !== id);
    }

    search(id)
    {
        let user = null;
        this.users.map(element =>{
            if (element.id === id)
                user = element
        });

        return user;
    }
}

module.exports = Users;