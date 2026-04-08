import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { store, type Program } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const emptyProgram: Program = { id: "", title: "", description: "", activities: [""], impact: "", image: "" };

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editing, setEditing] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setPrograms(store.getPrograms()); }, []);

  const save = () => {
    if (!editing?.title || !editing?.description) {
      toast({ title: "Error", description: "Title and description are required.", variant: "destructive" });
      return;
    }
    const cleaned = { ...editing, activities: editing.activities.filter((a) => a.trim()) };
    let updated: Program[];
    if (cleaned.id) {
      updated = programs.map((p) => (p.id === cleaned.id ? cleaned : p));
    } else {
      updated = [...programs, { ...cleaned, id: Date.now().toString() }];
    }
    store.setPrograms(updated);
    setPrograms(updated);
    setEditing(null);
    setShowForm(false);
    toast({ title: "Saved!" });
  };

  const remove = (id: string) => {
    const updated = programs.filter((p) => p.id !== id);
    store.setPrograms(updated);
    setPrograms(updated);
    toast({ title: "Deleted" });
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
        <Button onClick={() => { setEditing({ ...emptyProgram }); setShowForm(true); }}>
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
          <Input placeholder="Image URL (optional)" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
          <Input placeholder="Impact stat (e.g. 2,000+ youths trained)" value={editing.impact} onChange={(e) => setEditing({ ...editing, impact: e.target.value })} />
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
          <Button onClick={save}>Save Program</Button>
        </div>
      )}

      <div className="space-y-3">
        {programs.map((program) => (
          <div key={program.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{program.title}</p>
              <p className="text-xs text-muted-foreground">{program.impact} • {program.activities.length} activities</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => { setEditing(program); setShowForm(true); }}><Pencil className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(program.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {programs.length === 0 && <p className="text-muted-foreground text-center py-8">No programs yet.</p>}
      </div>
    </div>
  );
};

export default AdminPrograms;
