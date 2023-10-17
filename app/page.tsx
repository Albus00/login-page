import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const url = 'https://bitter-cricket.pockethost.io/'
const client = new PocketBase(url)

async function getRecords() {
  const records = await client.collection('users').getFullList({
    sort: '-created',
  });
  return records;
}

export default function Home() {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    getRecords().then(data => setRecords(data));
  }, []);

  return (
    <main>
      Ja hej
      {records && records.map(record => (
        <div key={record.id}>
          {/* Render your record data here */}
        </div>
      ))}
    </main>
  )
}