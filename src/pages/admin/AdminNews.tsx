import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase, uploadImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";

type NewsPost = {
  id: string;
  title: string;
  date?: string;
  category: string;
  excerpt: string;
  image_url?: string;
};


const AdminNews = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [editing, setEditing] = useState<NewsPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, "news");
      setEditing({ ...editing, image_url: url });
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.excerpt) {
      toast({ title: "Error", description: "Title and excerpt are required.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    if (editing.id) {
      // Update
      const { error } = await supabase.from('news_posts').update({
        title: editing.title,
        category: editing.category,
        excerpt: editing.excerpt,
        image_url: editing.image_url,
        updated_at: new Date().toISOString()
      }).eq('id', editing.id);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "News post updated successfully." });
    } else {
      // Insert
      const { error } = await supabase.from('news_posts').insert([{
        title: editing.title,
        category: editing.category,
        excerpt: editing.excerpt,
        image_url: editing.image_url
      }]);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "News post created successfully." });
    }
    
    setEditing(null);
    setShowForm(false);
    fetchPosts();
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setLoading(true);
    const { error } = await supabase.from('news_posts').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "News post removed." });
    }
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">News Posts ({posts.length})</h2>
        <Button onClick={() => { setEditing({ id: "", title: "", category: "Events", excerpt: "", image_url: "" }); setShowForm(true); }} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" /> Add Post
        </Button>
      </div>

      {showForm && editing && (
        <div className="bg-card rounded-2xl p-6 border border-border mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit Post" : "New Post"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <Input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option>Events</option>
              <option>Achievements</option>
              <option>Announcements</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Image</label>
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
          <Textarea placeholder="Excerpt / summary" value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={3} />
          <Button onClick={save} disabled={loading || uploading}>
            {loading ? "Saving..." : editing.id ? "Update Post" : "Create Post"}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {loading && posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Loading posts...</p>
        ) : (
          posts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.category}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => { setEditing(post); setShowForm(true); }}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        )))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No news posts yet.</p>}
      </div>
    </div>
  );
};

export default AdminNews;
