/*
  # Update Video Storage Policies

  1. Changes
    - Remove authenticated-only upload restriction
    - Allow public uploads to the videos bucket
    - Keep public read access
    - Allow public deletes (can be restricted later if needed)

  2. Security
    - File size limits (500MB) still apply
    - MIME type restrictions still apply
    - Consider adding authentication later for production
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;

-- Allow anyone to upload videos
CREATE POLICY "Anyone can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'videos');

-- Allow anyone to update videos
CREATE POLICY "Anyone can update videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'videos')
WITH CHECK (bucket_id = 'videos');

-- Allow anyone to delete videos
CREATE POLICY "Anyone can delete videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'videos');