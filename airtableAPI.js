const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

console.log("API Key:", AIRTABLE_API_KEY);
console.log("Base ID:", BASE_ID);
console.log("Table Name:", TABLE_NAME);

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
};

// Fetch all records from Airtable
export const fetchAirtableData = async () => {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  console.log("Airtable API URL:", url);
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    if (!data.records) {
      throw new Error("Invalid response format: no records found");
    }

    return data.records.map((record) => ({
      id: record.id,
      title: record.fields.title,
    }));
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    throw error;
  }
};

// Add a new record to Airtable
export const addAirtableRecord = async (title) => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          fields: { title },
        }),
      }
    );
    const data = await response.json();
    return { id: data.id, title: data.fields.title };
  } catch (error) {
    console.error("Error adding data to Airtable:", error);
    throw error;
  }
};

// Delete a record from Airtable
export const deleteAirtableRecord = async (id) => {
  try {
    await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );
  } catch (error) {
    console.error("Error deleting data from Airtable:", error);
    throw error;
  }
};

// Clear all records from Airtable
export const clearAirtableTable = async (ids) => {
  try {
    for (const id of ids) {
      await deleteAirtableRecord(id);
    }
  } catch (error) {
    console.error("Error clearing Airtable table:", error);
    throw error;
  }
};
