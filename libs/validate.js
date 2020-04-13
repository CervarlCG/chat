class Validate
{
    user(username)
    {
        return !this.emptyString(username);
    }

    message(msg)
    {
        return !this.emptyString(msg.msg);
    }

    emptyString(str)
    {
        return typeof str !== 'string' || str.trim() === '';
    }
}

module.exports = Validate;