const admin = require('firebase-admin');

// Load Firebase service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addMonthFieldsForAllUsers() {
  console.log('🚀 Adding month fields to bills for ALL users...\n');

  try {
    // Get all users
    const usersSnapshot = await db.collection('users').listDocuments();
    
    console.log(`👥 Found ${usersSnapshot.length} users\n`);

    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalProcessed = 0;

    for (const userDoc of usersSnapshot) {
      const userId = userDoc.id;
      console.log(`\n👤 Processing user: ${userId}`);
      console.log('─'.repeat(60));

      const billsRef = db.collection(`users/${userId}/grabfood_bills`);
      const snapshot = await billsRef.get();

      if (snapshot.empty) {
        console.log(`  📭 No bills found for this user\n`);
        continue;
      }

      console.log(`  📊 Found ${snapshot.size} bills\n`);

      let updatedCount = 0;
      let skippedCount = 0;
      let batch = db.batch();
      let batchCount = 0;

      for (const doc of snapshot.docs) {
        const data = doc.data();
        
        // Check if month field already exists
        if (data.month) {
          skippedCount++;
          continue;
        }

        // Extract month from datetime or date
        let month = null;
        
        if (data.datetime) {
          // Format: "2024-12-27 | 14:30"
          const dateMatch = data.datetime.match(/^(\d{4}-\d{2})/);
          if (dateMatch) {
            month = dateMatch[1];
          }
        } else if (data.date) {
          // Format: "2024-12-27"
          const dateMatch = data.date.match(/^(\d{4}-\d{2})/);
          if (dateMatch) {
            month = dateMatch[1];
          }
        }

        if (month) {
          // Extract date if missing
          let date = data.date;
          if (!date && data.datetime) {
            const dateMatch = data.datetime.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) {
              date = dateMatch[1];
            }
          }

          // Update document with month and date
          batch.update(doc.ref, {
            month: month,
            ...(date && !data.date ? { date: date } : {})
          });

          batchCount++;
          updatedCount++;

          // Commit batch every 500 documents
          if (batchCount >= 500) {
            await batch.commit();
            batch = db.batch();
            batchCount = 0;
          }
        } else {
          skippedCount++;
        }
      }

      // Commit remaining documents
      if (batchCount > 0) {
        await batch.commit();
      }

      console.log(`  ✅ Updated: ${updatedCount} bills`);
      console.log(`  ⏭️  Skipped: ${skippedCount} bills`);
      
      totalUpdated += updatedCount;
      totalSkipped += skippedCount;
      totalProcessed += snapshot.size;
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Update Complete for ALL Users!');
    console.log('='.repeat(60));
    console.log(`👥 Users processed: ${usersSnapshot.length}`);
    console.log(`✅ Bills updated: ${totalUpdated}`);
    console.log(`⏭️  Bills skipped: ${totalSkipped}`);
    console.log(`📊 Total bills: ${totalProcessed}`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    if (error.code === 'ENOENT') {
      console.error('💡 Missing serviceAccountKey.json file!');
    }
  }
}

// Run update
addMonthFieldsForAllUsers()
  .then(() => {
    console.log('✅ Script finished successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });