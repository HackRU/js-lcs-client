# js-lcs-client
A client for easily using lcs from javascript.

## Documentation
Build the API documentation with `npm run doc`.
View the resulting HTML documentation in `docs/index.html`.

## Example Usage
Login and print a user's profile.

```js
import {LcsClient} from 'js-lcs-client';

const cli = new LcsClient("<lcs url>");

await cli.login('<email>', '<password>');

const profile = await cli.profile();

console.log(profile.first_name, profile.last_name);
// prints "John Doe"
```

## TODO
- Implement more endpoints
- Add doc comments to methods and classes
- Auto publish to NPM
- Docs should be published to github pages.
- Add tests
