import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Extrae el id del producto de la URL

  // Asegúrate de que el id es un número válido
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  // Manejo de solicitudes GET
  if (req.method === 'GET') {
    try {
      // Busca un producto por su ID
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }, // Convertimos el id a un número entero
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      return res.status(200).json(product); // Devuelve el producto encontrado en formato JSON
    } catch (error: unknown) {
      console.error(error); // Log para detalles del error
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Failed to fetch product', details: error.message });
      }
      return res.status(500).json({ error: 'Failed to fetch product', details: 'Unknown error' });
    }
  }

  // Manejo de solicitudes PUT (Actualizar producto)
  if (req.method === 'PUT') {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
      // Actualiza un producto con el ID dado
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { name, price },
      });

      return res.status(200).json(updatedProduct); // Devuelve el producto actualizado
    } catch (error: unknown) {
      console.error(error); // Log para detalles del error
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Failed to update product', details: error.message });
      }
      return res.status(500).json({ error: 'Failed to update product', details: 'Unknown error' });
    }
  }

  // Manejo de solicitudes DELETE
  if (req.method === 'DELETE') {
    try {
      // Elimina un producto por su ID
      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: 'Product deleted', product: deletedProduct });
    } catch (error: unknown) {
      console.error(error); // Log para detalles del error
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Failed to delete product', details: error.message });
      }
      return res.status(500).json({ error: 'Failed to delete product', details: 'Unknown error' });
    }
  }

  // Si el método no es GET, PUT ni DELETE, devuelve un error de método no permitido
  return res.status(405).json({ error: 'Method Not Allowed' });
}
