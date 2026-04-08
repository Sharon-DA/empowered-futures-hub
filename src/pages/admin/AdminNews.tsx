import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { store, type NewsPost } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const emptyPost: NewsPost = { id: "", title: "", date: "", category: "Events", excerpt: "", image: "" };

const AdminNews = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [editing, setEditing] = useState<NewsPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setPosts(store.getNews()); }, []);

  const save = () => {
    if (!editing?.title || !editing?.excerpt) {
      toast({ title: "Error", description: "Title and excerpt are required.", variant: "destructive" });
      return;
    }
    let updated: NewsPost[];
    if (editing.id) {
      updated = posts.map((p) => (p.id === editing.id ? editing : p));
    } else {
      updated = [...posts, { ...editing, id: Date.now().toString() }];
    }
    store.setNews(updated);
    setPosts(updated);
    setEditing(null);
    setShowForm(false);
    toast({ title: "Saved!", description: "News post saved successfully." });
  };

  const remove = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    store.setNews(updated);
    setPosts(updated);
    toast({ title: "Deleted", description: "News post removed." });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">News Posts ({posts.length})</h2>
        <Button onClick={() => { setEditing({ ...emptyPost, date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) }); setShowForm(true); }}>
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
            <Input placeholder="Date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
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
          <Input placeholder="Image URL (optional)" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
          <Textarea placeholder="Excerpt / summary" value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={3} />
          <Button onClick={save}>Save Post</Button>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.category} • {post.date}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => { setEditing(post); setShowForm(true); }}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No news posts yet.</p>}
      </div>
    </div>
  );
};

export default AdminNews;
