"use server";
import client from "@/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const db = await client.db("Project");







export async function getDesc() {
  try {
    // Fetch data from MongoDB collection
    const texts = await db.collection("New_col1").find({}, { projection: { text: 1 } }).toArray();
console.log(texts,"texts data");
    // Return the transformed data
   
    return texts.map((item) => ({
      id: item._id.toString(),  // Convert MongoDB ObjectId to string
      text: item.text,  // Assuming 'text' is the description field
    }));
  } catch (e) {
    console.error("Error fetching descriptions:", e.message);
    throw new Error("Failed to fetch descriptions");
  }
}

/**
 * CREATE a new description
 * @param {string} text - The description text to be added
 */
export async function createDesc(text) {
  try {
    const result = await db.collection("New_col1").insertOne({ text });
    console.log("Inserted description:", result);
    revalidatePath("/"); // Optionally trigger revalidation after insertion
  } catch (e) {
    console.error("Error inserting description:", e);
    throw new Error("Failed to insert description");
  }
}

/**
 * DELETE a description by ID
 * @param {string} id - The ObjectId of the description to be deleted
 */
export const deleteDesc = async (text) => {
  console.log('Calling deleteDescByText with text:', text); // For debugging

  try {
    // Ensure that text is provided
    if (!text) {
      throw new Error('Text is required');
    }

    // Fetch the description to ensure we have the correct text
    const description = await db.collection("New_col1").findOne({_id: new ObjectId(text)});

    if (!description) {
      throw new Error('Description not found');
    }

    // Proceed with deleting the description based on text
    const deleteResponse = await db.collection("New_col1").deleteOne({ _id: new ObjectId(text) });

    if (deleteResponse.deletedCount > 0) {
      console.log('Deleted description with text:', text);
      return { message: 'Description deleted successfully' };
    } else {
      throw new Error('Failed to delete description');
    }
  } catch (error) {
    console.error('Error deleting description:', error);
    throw new Error('Failed to delete description');
  }
};


/**
 * UPDATE a description by ID
 * @param {string} id - The ObjectId of the description to be updated
 * @param {string} newText - The new text to replace the old description
 */
export async function updateDesc(id, newText) {
  try {
    // Check if the provided id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId format');
    }

    const result = await db.collection("New_col1").updateOne(
      { _id: new ObjectId(id) }, // Find the document by _id
      { $set: { text: newText } } // Update the text field
    );

    if (result.modifiedCount > 0) {
      console.log("Description updated successfully:", id);
      return { message: 'Description updated successfully' };
    } else {
      throw new Error('Description not found or no changes made');
    }
  } catch (error) {
    console.error("Error updating description:", error);
    throw new Error('Failed to update description');
  }
}
