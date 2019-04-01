# js-lcs-client
a client for easily using lcs from javascript

## example ussage
login and get a user's profile
```
var cli = new LcsClient("<lcs url>");
cli.login.password("<email>", "<pass>").then((_) => {
    return cli.profile.get()
}).then(prof => {
    console.log(prof);
}).catch(err => {
    console.log(err, " sorry that login didn't work");
})

```
errors
- login
  - bad login (username or password failed)
  - login expired (you tried to do somthing that required login but you weren't)
  - login failed (an unexpected error occured while loging in)
  - not stored

__bold__ = implemented

## lcsclient
### properties
token
expiration
email
cached_profile
### methods
- __lcsClient(baseurl, [token])__
- raw
  - a raw axios client (this is different for other apis)
  - __raw.post(endpoint, data)__
  - __raw.get(endpoint, data)__
- login
  - __login.token(email, token)__
  - __login.password(email, pasword)__
  - __login.isValid()__
  - login.stored()
  - login.clear_stored()
- profile
  - profile.create(profile)
  - profile.update(changes)
  - __profile.get()__
    - promise containing profile
  - profile.getCached() // maybe instead call get_once()

## v2 extension methods
- magic
  - magic.consume(link)
  - magic.forgot()
  - magic.promote({email, role}...)
- dayof
  - dayof.events()
  - dayof.slacks()
  - dayof.attendEvent(name)
- email(template, recipients)