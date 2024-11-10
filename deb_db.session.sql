INSERT INTO users (
		username,
		password_hash,
		email,
		apartment
	)
VALUES (
		'user',
		'hash',
		'email@mail.com',
		'a1'
	);


DROP TABLE users;
DROP TYPE roles;

DROP TABLE kysely_migration, kysely_migration_lock;