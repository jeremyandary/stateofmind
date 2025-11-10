/*
  # Increase Video Storage Limit

  1. Changes
    - Increase the file size limit for the videos bucket from 2GB to 5GB
    - This allows uploading larger video files for portfolio content

  2. Notes
    - New limit: 5GB (5,368,709,120 bytes)
    - Previous limit: 2GB (2,147,483,648 bytes)
*/

UPDATE storage.buckets 
SET file_size_limit = 5368709120 
WHERE id = 'videos';