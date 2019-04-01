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

_bold_ = implemented

## lcsclient
### properties
token
expiration
email
cached_profile
### methods
- _lcsClient(baseurl, [token])_
- raw
  - a raw axios client (this is different for other apis)
  - _raw.post(endpoint, data)_
  - _raw.get(endpoint, data)_
- login
  - _login.token(email, token)_
  - _login.password(email, pasword)_
  - _login.isValid()_
  - login.stored()
  - login.clear_stored()
- profile
  - profile.create(profile)
  - profile.update(changes)
  - _profile.get()_
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