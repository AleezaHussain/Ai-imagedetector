import got from 'got'; // Import 'got' for making HTTP requests

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body; // Expecting imageUrl in the request body

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Access from environment variables
    const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

    const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(imageUrl)}`;

    try {
      const response = await got(url, {
        username: apiKey,
        password: apiSecret,
      });

      const tagsData = JSON.parse(response.body); // Parse the response
      return res.status(200).json(tagsData); // Send the tags data back as JSON
    } catch (error) {
      console.error('Error fetching tags:', error.response ? error.response.body : error);
      return res.status(500).json({ error: 'Error fetching tags from Imagga' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
