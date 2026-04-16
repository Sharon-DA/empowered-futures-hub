import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase, uploadImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Program = {
  id: string;
  title: string;
  description: string;
  activities: string[];
  impact: string;
  duration?: string;
  image_url: string;
};

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editing, setEditing] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, "programs");
      setEditing({ ...editing, image_url: url });
      toast({ title: "Success", description: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const fetchPrograms = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPrograms(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPrograms(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.description) {
      toast({ title: "Error", description: "Title and description are required.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    const cleanedActivities = editing.activities.filter((a) => a.trim());
    
    if (editing.id) {
      // Update
      const { error } = await supabase.from('programs').update({
        title: editing.title,
        description: editing.description,
        activities: cleanedActivities,
        impact: editing.impact,
        duration: editing.duration,
        image_url: editing.image_url
      }).eq('id', editing.id);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "Program updated successfully." });
    } else {
      // Insert
      const { error } = await supabase.from('programs').insert([{
        title: editing.title,
        description: editing.description,
        activities: cleanedActivities,
        impact: editing.impact,
        duration: editing.duration,
        image_url: editing.image_url
      }]);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved!", description: "Program created successfully." });
    }
    
    setEditing(null);
    setShowForm(false);
    fetchPrograms();
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    
    setLoading(true);
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Program removed." });
    }
    fetchPrograms();
  };

  const updateActivity = (index: number, value: string) => {
    if (!editing) return;
    const activities = [...editing.activities];
    activities[index] = value;
    setEditing({ ...editing, activities });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Programs ({programs.length})</h2>
        <Button onClick={() => { setEditing({ id: "", title: "", description: "", activities: [""], impact: "", duration: "", image_url: "" }); setShowForm(true); }} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" /> Add Program
        </Button>
      </div>

      {showForm && editing && (
        <div className="bg-card rounded-2xl p-6 border border-border mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit Program" : "New Program"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <Input placeholder="Program Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <Textarea placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Program Image</label>
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
          <Input placeholder="Impact stat (e.g. 2,000+ youths trained)" value={editing.impact} onChange={(e) => setEditing({ ...editing, impact: e.target.value })} />
          <Input placeholder="Duration (e.g. 6 Months)" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} />
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Activities</label>
            {editing.activities.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input placeholder={`Activity ${i + 1}`} value={a} onChange={(e) => updateActivity(i, e.target.value)} />
                {editing.activities.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => setEditing({ ...editing, activities: editing.activities.filter((_, j) => j !== i) })}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setEditing({ ...editing, activities: [...editing.activities, ""] })}>
              + Add Activity
            </Button>
          </div>
          <Button onClick={save} disabled={loading || uploading}>
            {loading ? "Saving..." : editing.id ? "Update Program" : "Create Program"}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {loading && programs.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Loading programs...</p>
        ) : (
          programs.map((program) => (
            <div key={program.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{program.title}</p>
                <p className="text-xs text-muted-foreground">
                  {program.impact} • {Array.isArray(program.activities) ? program.activities.length : 0} activities
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditing(program); setShowForm(true); }}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(program.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))
        )}
        {!loading && programs.length === 0 && <p className="text-muted-foreground text-center py-8">No programs yet.</p>}
      </div>
    </div>
  );
};

export default AdminPrograms;

