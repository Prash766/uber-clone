INSERT INTO "CaptainLocation" ("captainId", "coordinates")
VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))
ON CONFLICT ("captainId")
DO UPDATE SET "coordinates" = EXCLUDED.coordinates,
              "updatedAt" = now()
              RETURNING *;