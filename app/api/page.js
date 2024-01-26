
// we can define metadata in two ways:

// 1. Static metadata: to modify the data in static way:

export const metadata = {
  title: 'Home',
};

// output ->
//   <head>
//     <title>Home</title>
//   </head>

export async function Page() {
  return (
    <h1> this is nextjs page using static metadata. </h1>
  )
}

// 2. Dynamic metadata: to generate metadata dynamically:
// (this will improve the SEO a lot lot)

export async function generateMetadata({ params, searchParams }) {
  const product = await getProduct(params.id);
  return { 
    title: product.title 
  };
}

// output ->
//   <head>
//     <title> unique product </title>
//   </head>