-- Rename passwordHash to password (if the column exists as passwordHash)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='User' AND column_name='passwordHash') THEN
    ALTER TABLE "User" RENAME COLUMN "passwordHash" TO "password";
  END IF;
END $$;

-- Add new User columns (if not exists)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update role column default and remove old roles
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'SALES';

-- Add submittedById to Inquiry (if not exists)
ALTER TABLE "Inquiry" ADD COLUMN IF NOT EXISTS "submittedById" INTEGER;

-- Add foreign key for submittedById
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='Inquiry_submittedById_fkey') THEN
    ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Handle Role enum: add SALES if it doesn't exist, remove old values
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel='SALES' AND enumtypid=(SELECT oid FROM pg_type WHERE typname='Role')) THEN
    ALTER TYPE "Role" ADD VALUE 'SALES';
  END IF;
END $$;
