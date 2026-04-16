-- Run this SQL in your Supabase SQL Editor to create the required tables

-- 1. Create a table for News Posts (Blog Posts)
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    excerpt TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create a table for Programs (Courses/Services)
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    activities TEXT[],
    impact TEXT,
    duration TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create a table for Gallery Images
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create a table for Site Settings (Homepage etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image_url TEXT,
    impact_stats JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Set up Row Level Security (RLS)
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
CREATE POLICY "Public Read Access for News" ON public.news_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Settings" ON public.site_settings FOR SELECT USING (true);

-- 7. Create policies for authenticated write access (Admins)
CREATE POLICY "Admin All Access for News" ON public.news_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access for Programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access for Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access for Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- 8. Seed initial site settings
INSERT INTO public.site_settings (id, hero_title, hero_subtitle, hero_image_url, impact_stats)
VALUES (1, 'Empowering Youths & Women for a Brighter Future', 'We invest in education, skills, and community to help youths and women build the future they deserve.', NULL, '{"empowered": 5000, "programs": 50, "volunteers": 200, "donations": 1000}')
ON CONFLICT (id) DO NOTHING;
