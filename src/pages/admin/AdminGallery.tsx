import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store, type GalleryItem } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const emptyItem: GalleryItem = { id: "", src: "", alt: "", category: "Events" };

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setItems(store.getGallery()); }, []);

  const save = () => {
    if (!editing?.alt) {
      toast({ title: "Error", description: "Description is required.", variant: "destructive" });
      return;
    }
    let updated: GalleryItem[];
    if (editing.id) {
      updated = items.map((i) => (i.id === editing.id ? editing : i));
    } else {
      updated = [...items, { ...editing, id: Date.now().toString() }];
    }
    store.setGallery(updated);
    setItems(updated);
    setEditing(null);
    setShowForm(false);
    toast({ title: "Saved!" });
  };

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    store.setGallery(updated);
    setItems(updated);
    toast({ title: "Deleted" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Gallery ({items.length})</h2>
        <Button onClick={() => { setEditing({ ...emptyItem }); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
      </div>

      {showForm && editing && (
        <div className="bg-card rounded-2xl p-6 border border-border mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit Image" : "New Image"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <Input placeholder="Image URL" value={editing.src} onChange={(e) => setEditing({ ...editing, src: e.target.value })} />
          <Input placeholder="Description / alt text" value={editing.alt} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} />
          <select
            value={editing.category}
            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option>Programs</option>
            <option>Events</option>
            <option>Workshops</option>
          </select>
          <Button onClick={save}>Save Image</Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group relative">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              {item.src ? (
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted-foreground text-xs">No image</span>
              )}
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.alt}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-muted-foreground text-center py-8">No gallery images yet.</p>}
    </div>
  );
};

export default AdminGallery;
