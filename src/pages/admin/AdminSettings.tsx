import { useState, useEffect } from "react";
import { Save, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase, uploadImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const AdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_image_url: "",
    impact_stats: {
      empowered: 0,
      programs: 0,
      volunteers: 0,
      donations: 0,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (data) {
      setSettings(data);
    } else if (error && error.code !== "PGRST116") {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Settings saved successfully" });
    }
    setSaving(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, "site");
      setSettings({ ...settings, hero_image_url: url });
      toast({ title: "Success", description: "Hero image uploaded" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading">Site Settings</h2>
          <p className="text-muted-foreground">Manage homepage content and site-wide configurations.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save All Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>The main section at the top of your homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_title">Headline</Label>
              <Input 
                id="hero_title" 
                value={settings.hero_title} 
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Sub-headline</Label>
              <Textarea 
                id="hero_subtitle" 
                rows={3}
                value={settings.hero_subtitle} 
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Background Image</Label>
              <div className="flex flex-col gap-4">
                {settings.hero_image_url && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                    <img src={settings.hero_image_url} alt="Hero Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  {uploading && <Loader2 className="w-6 h-6 animate-spin mt-2" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Stats</CardTitle>
            <CardDescription>Numbers shown in the "Our Impact" section.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>People Empowered</Label>
                <Input 
                  type="number" 
                  value={settings.impact_stats.empowered} 
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    impact_stats: { ...settings.impact_stats, empowered: parseInt(e.target.value) || 0 } 
                  })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Programs Completed</Label>
                <Input 
                  type="number" 
                  value={settings.impact_stats.programs} 
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    impact_stats: { ...settings.impact_stats, programs: parseInt(e.target.value) || 0 } 
                  })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Active Volunteers</Label>
                <Input 
                  type="number" 
                  value={settings.impact_stats.volunteers} 
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    impact_stats: { ...settings.impact_stats, volunteers: parseInt(e.target.value) || 0 } 
                  })} 
                />
              </div>
              <div className="space-y-2">
                <Label>Donations Received</Label>
                <Input 
                  type="number" 
                  value={settings.impact_stats.donations} 
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    impact_stats: { ...settings.impact_stats, donations: parseInt(e.target.value) || 0 } 
                  })} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AdminSettings;
