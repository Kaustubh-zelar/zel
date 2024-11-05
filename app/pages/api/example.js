import connectToDatabase from '../../lib/mongodb';
import ExampleModel from '../../models/ExampleModel';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const data = await ExampleModel.find();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const newItem = new ExampleModel(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

