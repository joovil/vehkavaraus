DELETE FROM users WHERE username='bob' ;

-- Drop the existing foreign key constraint
ALTER TABLE verifications
DROP CONSTRAINT verifications_user_id_fkey;

-- Add a new foreign key constraint with ON DELETE CASCADE
ALTER TABLE verifications
ADD CONSTRAINT verifications_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;