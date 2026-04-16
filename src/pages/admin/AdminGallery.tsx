import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase, uploadImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type GalleryItem = {
  id: string;
  image_url: string;
  title: string;
  category: string;
};

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, "gallery");
      setEditing({ ...editing, image_url: url });
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchGallery(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.image_url) {
      toast({ title: "Error", description: "Title and Image URL are required.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    if (editing.id) {
      // Update
      const { error } = await supabase.from('gallery').update({
        title: editing.title,
        image_url: editing.image_url,
        category: editing.category,
      }).eq('id', editing.id);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "Gallery item updated successfully." });
    } else {
      // Insert
      const { error } = await supabase.from('gallery').insert([{
        title: editing.title,
        image_url: editing.image_url,
        category: editing.category,
      }]);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "Gallery item created successfully." });
    }
    
    setEditing(null);
    setShowForm(false);
    fetchGallery();
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    setLoading(true);
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Gallery item removed." });
    }
    fetchGallery();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Gallery ({items.length})</h2>
        <Button onClick={() => { setEditing({ id: "", image_url: "", title: "", category: "Events" }); setShowForm(true); }} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
      </div>

      {showForm && editing && (
        <div className="bg-card rounded-2xl p-6 border border-border mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit Image" : "New Image"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Gallery Image</label>
            <div className="flex flex-col gap-4">
              {editing.image_url && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <img src={editing.image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  disabled={uploading}
                  className="flex-1"
                />
                {uploading && <Loader2 className="w-6 h-6 animate-spin mt-2" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">OR Paste URL:</span>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  value={editing.image_url || ""} 
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} 
                />
              </div>
            </div>
          </div>
          <Input placeholder="Description / Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <select
            value={editing.category}
            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option>Programs</option>
            <option>Events</option>
            <option>Workshops</option>
          </select>
          <Button onClick={save} disabled={loading || uploading}>
            {loading ? "Saving..." : editing.id ? "Update Image" : "Create Image"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading && items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8 col-span-full">Loading gallery...</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group relative">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-xs">No image</span>
                )}
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditing(item); setShowForm(true); }}><Plus className="w-3 h-3 rotate-45" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {!loading && items.length === 0 && <p className="text-muted-foreground text-center py-8">No gallery images yet.</p>}
    </div>
  );
};

export default AdminGallery;

