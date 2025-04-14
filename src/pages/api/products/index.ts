import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error: unknown) {
      console.error(error); // Log para detalles del error
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Failed to fetch products', details: error.message });
      }
      return res.status(500).json({ error: 'Failed to fetch products', details: 'Unknown error' });
    }
  }

  if (req.method === 'POST') {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
      const newProduct = await prisma.product.create({
        data: { name, price },
      });
      return res.status(201).json(newProduct);
    } catch (error: unknown) {
      console.error(error); // Log para detalles del error
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Failed to create product', details: error.message });
      }
      return res.status(500).json({ error: 'Failed to create product', details: 'Unknown error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
