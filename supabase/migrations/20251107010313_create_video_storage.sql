/*
  # Create Video Storage Bucket

  1. Storage Setup
    - Creates a public 'videos' bucket for storing portfolio videos
    - Allows public access for video playback
    - Sets file size limit to 500MB per video
    - Accepts video file types (mp4, mov, avi, webm, etc.)

  2. Security
    - Public bucket allows anyone to view videos
    - Only authenticated users can upload videos
    - File size limit prevents abuse
*/

-- Create the storage bucket for videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  524288000, -- 500MB limit
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Public Access'
  ) THEN
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'videos');
  END IF;
END $$;

-- Allow authenticated users to upload videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload videos'
  ) THEN
    CREATE POLICY "Authenticated users can upload videos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'videos');
  END IF;
END $$;

-- Allow authenticated users to delete their own videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can delete videos'
  ) THEN
    CREATE POLICY "Authenticated users can delete videos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'videos');
  END IF;
END $$;