import { IsNumber, IsString } from "class-validator"

export class CreateReviewDto {
  @IsNumber()
  rating!: number

  @IsString()
  comment?: string

  @IsNumber()
  providerProfileId!: number

  @IsNumber()
  userId!: number

  @IsNumber()
  bookingId!: number
}

/**
 * model Review {
  id        String   @id @default(uuid())
  rating    Int
  comment   String?  @db.Text
  createdAt DateTime @default(now())

  User      User?    @relation(fields: [userId], references: [id])
  userId    Int?
  Booking   Booking? @relation(fields: [bookingId], references: [id])
  bookingId Int?     @unique
}
 */