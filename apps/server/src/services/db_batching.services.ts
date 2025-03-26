import { prisma } from "@repo/db";
import { updatedCaptainLocation } from "../utils/socket";
import { updateCaptainLocation } from "@prisma/client/sql";

export const batchLocationUpdatesToDatabase = async () => {
  // if (updatedCaptainLocation.length === 0) {
  //   return;
  // }
  const batchedQueries:any[] = []
  try {
    updatedCaptainLocation.forEach(
      ({ captainId, coordinates: { longitude, latitude } }) => {
        console.log("longitude , latitdue" , longitude , latitude , typeof latitude)
        batchedQueries.push(prisma.$queryRawTyped(updateCaptainLocation(captainId ,longitude ,latitude )));
      }
    );
    console.log("BATCHED QUERYIES",batchedQueries)
    const res = await prisma.$transaction(batchedQueries);

    console.log("DB UPDATING SERVICE ", res);
  } catch (error) {
    console.error("Error updating captain locations:", error);
  }
};


// another working query without using the typedSql preview feature 
//command used to generate the Prisma Client was prisma generate --sql 


//      updatedCaptainLocation.forEach(
//       ({ captainId, coordinates: { longitude, latitude } }) => {
//         batchedQueries.push( prisma.$executeRaw`
// INSERT INTO "CaptainLocation" ("captainId", "coordinates")
// VALUES (${captainId}, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
// ON CONFLICT ("captainId")
// DO UPDATE SET "coordinates" = EXCLUDED.coordinates,
//               "updatedAt" = now();
//         `)  
//       }
//     );
    /*
EXCLUDED is a special table alias used in ON CONFLICT ... DO UPDATE queries.
 It refers to the values that were originally attempted to be inserted but were conflicted
  (i.e., they couldn't be inserted because of a unique constraint violation).

    */
 
