import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add timestamp
    const record = {
      ...data,
      submittedAt: new Date().toISOString()
    };

    // Define the path for the JSON file in the root of the project
    const filePath = path.join(process.cwd(), 'deleted_accounts.json');

    let accounts = [];

    // Check if the file exists and read its contents
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      if (fileData) {
        accounts = JSON.parse(fileData);
      }
    }

    // Add the new record
    accounts.push(record);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Account deletion request submitted successfully.' });
  } catch (error) {
    console.error('Error saving delete account request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
