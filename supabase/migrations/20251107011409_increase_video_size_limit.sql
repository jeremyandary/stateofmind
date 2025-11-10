/*
  # Increase Video Storage Size Limit

  1. Changes
    - Update the videos bucket file size limit from 500MB to 2GB
    - Allows larger video files to be uploaded

  2. Notes
    - 2GB = 2,147,483,648 bytes
    - Existing policies remain unchanged
*/

-- Update the file size limit to 2GB
UPDATE storage.buckets
SET file_size_limit = 2147483648
WHERE id = 'videos';