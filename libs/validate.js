class Validate
{
    user(username)
    {
        if(typeof username === 'string' && username.trim !== '')
            return true;
        else
            return false;
    }
}

module.exports = Validate;