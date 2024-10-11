import dotenv from "dotenv";
import { sql } from "@vercel/postgres";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a single survey entry
function generateSurveyEntry() {
  return {
    educationHours: getRandomInt(1, 4),
    peerPressureConfidence: getRandomInt(1, 4),
    trustedAdults: getRandomInt(1, 4),
    campaignMessages: getRandomInt(1, 4),
    drugFreeActivities: getRandomInt(1, 4),
  };
}

// Generate 50 survey entries
const seedData = Array.from({ length: 50 }, generateSurveyEntry);

// Function to create the table if it doesn't exist
async function createTableIfNotExists() {
  await sql`
    CREATE TABLE IF NOT EXISTS heartcodetraining_drug_prevention_survey (
      id SERIAL PRIMARY KEY,
      education_hours INTEGER NOT NULL,
      peer_pressure_confidence INTEGER NOT NULL,
      trusted_adults INTEGER NOT NULL,
      campaign_messages INTEGER NOT NULL,
      drug_free_activities INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Table created or already exists.");
}

// Function to seed the database
async function seedDatabase() {
  try {
    console.log("Starting to seed the database...");

    // Check if POSTGRES_URL is set
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL is not set in the environment variables");
    }

    // Create table if it doesn't exist
    await createTableIfNotExists();

    // Insert all entries
    for (const entry of seedData) {
      await sql`
        INSERT INTO heartcodetraining_drug_prevention_survey 
        (education_hours, peer_pressure_confidence, trusted_adults, campaign_messages, drug_free_activities)
        VALUES 
        (${entry.educationHours}, ${entry.peerPressureConfidence}, ${entry.trustedAdults}, ${entry.campaignMessages}, ${entry.drugFreeActivities})
      `;
    }

    console.log("Database seeded successfully with 50 entries.");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
    if (error.message.includes("POSTGRES_URL is not set")) {
      console.error(
        "Please make sure you have set the POSTGRES_URL in your .env file"
      );
    }
  }
}

// Run the seeding function
seedDatabase();
