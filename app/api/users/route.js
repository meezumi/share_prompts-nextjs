// this is now gonna act as an api backend route.

// Next.js supports the following http methods:

// 1. GET: retrieves data or resources from the server.
// 2. POST: Submits data to the server to create a new resource.
// 3. PUT: updates or replaces an existing resource on the server.
// 4. PATCH: partially updates an existing resource on the server.
// 5. DELETE:
// 6. HEAD: retrieves the headers of the resource without fetching its body.
// 7. OPTIONS: retrives the supported http methods and other communication options for a resource.  

// export async function GET(request) {
//   return new Response("Hellow, next.js");
// }

// ------------------------------------------------------------------------------

// what we had to do before:

const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
	const users = [
		{ id: 1, name: 'john' },
		{ id: 2, name: 'jane' },
		{ id: 3, name: 'bob' }
			];
	res.json(users);
});

app.listen(3000, () => {
	console.log('server up and running at 3000');
});

// ------------------------------------------------------------------------------

// what we have to do now, using next.js


// http://localhost:3000/api/users

export async function GET(request){
  const users = [
    { id: 1, name: "john" },
    { id: 2, name: 'jane' },
    { id: 3, name: "bob" },
  ];
  return new Response(JSON.stringify(users));
}

