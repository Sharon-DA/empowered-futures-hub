import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qjhczdgtatzqfmntvgar.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaGN6ZGd0YXR6cWZtbnR2Z2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTU1NzgsImV4cCI6MjA5MTkzMTU3OH0.aWhVCcKxdDMKm2REiahC-tTBAwHM1f1xSnzCWSk3NHE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, folder: string = "general") => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('website_images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('website_images')
    .getPublicUrl(filePath);

  return publicUrl;
};
