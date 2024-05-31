-- Remove old data from the Contact table
DELETE FROM "Contact" WHERE "customerId" IS NULL;