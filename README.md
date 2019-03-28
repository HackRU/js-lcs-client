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

*bold* = implemented

## lcsclient
### properties
token
expiration
email
cached_profile
### methods
- *lcsClient(baseurl, [token])*
- raw
  - a raw axios client (this is different for other apis)
  - *raw.post(endpoint, data)*
  - *raw.get(endpoint, data)*
- login
  - *login.token(email, token)*
  - *login.password(email, pasword)*
  - *login.isValid()*
- profile
  - profile.create(profile)
  - profile.update(changes)
  - *profile.get()*
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