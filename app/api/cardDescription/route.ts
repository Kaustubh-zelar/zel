import { NextResponse } from 'next/server';

// This function handles GET requests to fetch card settings
export async function GET() {
  try {
    // Here, you will fetch the card settings from your database
    // For demonstration, let's return some dummy data
    const cardSettings = [
      { key: 'announcements', descriptions: ['Announcement 1', 'Announcement 2'] },
      { key: 'birthdays', descriptions: ['Birthday 1', 'Birthday 2'] },
      { key: 'trainings', descriptions: ['Training 1', 'Training 2'] },
      { key: 'tasks', descriptions: ['Task 1', 'Task 2'] },
    ];

    // Return the fetched card settings
    return NextResponse.json(cardSettings, { status: 200 });
  } catch (error) {
    console.error('Error fetching card settings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
